/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ts from 'typescript';
import {WrappedNodeExpr, WritePropExpr} from '@angular/compiler';
import {ComponentDecoratorHandler, DirectiveDecoratorHandler, InjectableDecoratorHandler, NgModuleDecoratorHandler, SelectorScopeRegistry} from '../../ngtsc/annotations';
import {CompileResult, DecoratorHandler} from '../../ngtsc/transform';
import {ImportAlias, ImportManager, translateStatement} from '../../ngtsc/transform/src/translator';
import {NgccReflectionHost} from './host/ngcc_host';
import {DecoratedClass, ParsedFile} from './parser/parser';

export interface AnalyzedClass {
  clazz: DecoratedClass;
  handler: DecoratorHandler<any>;
  analysis: any;
  diagnostics?: ts.Diagnostic[];
  compilation: CompileResult;
  renderedDefinition: string;
}

export interface AnalyzedFile {
  analyzedClasses: AnalyzedClass[];
  imports: ImportAlias[];
  sourceFile: ts.SourceFile;
}

export class Analyzer {
  scopeRegistry = new SelectorScopeRegistry(this.typeChecker, this.host);
  handlers: DecoratorHandler<any>[] = [
    new ComponentDecoratorHandler(this.typeChecker, this.host, this.scopeRegistry),
    new DirectiveDecoratorHandler(this.typeChecker, this.host, this.scopeRegistry),
    new InjectableDecoratorHandler(this.host),
    new NgModuleDecoratorHandler(this.typeChecker, this.scopeRegistry),
  ];

  constructor(private typeChecker: ts.TypeChecker, private host: NgccReflectionHost) {}

  analyzeFile(file: ParsedFile): AnalyzedFile {
    const importManager = new ImportManager();
    const analyzedClasses = file.decoratedClasses
      .map(clazz => this.analyzeClass(file.sourceFile, clazz, importManager))
      .filter(analysis => !!analysis) as AnalyzedClass[];

    const imports = importManager.getAllImports();

    return {
      analyzedClasses,
      imports,
      sourceFile: file.sourceFile,
    };
  }

  analyzeClass(file: ts.SourceFile, clazz: DecoratedClass, importManager: ImportManager): AnalyzedClass|undefined {
    const detected = this.handlers
      .map(handler => ({ handler, decorator: handler.detect(clazz.decorators) }))
      .filter(detected => detected.decorator);

    if (detected.length > 0) {
      if (detected.length > 1) {
        throw new Error('TODO.Diagnostic: Class has multiple Angular decorators.');
      }
      const handler = detected[0].handler;
      const {analysis, diagnostics} = handler.analyze(clazz.declaration, detected[0].decorator!);
      const compilation = handler.compile(clazz.declaration, analysis);
      const renderedDefinition = this.renderDefinition(file, clazz.name, compilation, importManager);
      return { clazz, handler, analysis, diagnostics, compilation, renderedDefinition };
    }
  }

  protected renderDefinition(sourceFile: ts.SourceFile, name: string, compilation: CompileResult, imports: ImportManager): string {
    const printer = ts.createPrinter();
    const definition = compilation.statements
      .map(statement => translateStatement(statement, imports))
      .concat(translateStatement(createAssignmentStatement(name, compilation), imports))
      .map(statement => printer.printNode(ts.EmitHint.Unspecified, statement, sourceFile))
      .join('\n');
    return definition;
  }
}


/**
 * Create an Angular AST statement node that contains the assignment of the
 * compiled decorator to be applied to the class.
 * @param analyzedClass The info about the class whose statement we want to create.
 */
function createAssignmentStatement(name: string, compilation: CompileResult) {
  const receiver = new WrappedNodeExpr(name);
  return new WritePropExpr(receiver, compilation.field, compilation.initializer).toStmt();
}