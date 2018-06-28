/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ts from 'typescript';
import {WrappedNodeExpr, WritePropExpr} from '@angular/compiler';
import {reflectIdentifierOfDeclaration} from '../../ngtsc/metadata/src/reflector';
import {ImportManager, translateStatement} from '../../ngtsc/transform/src/translator';
import {AnalyzedClass} from './analyzer';

export interface RenderedClass {
  analyzedClass: AnalyzedClass;
  renderedOutput: string;
}

export class Renderer {
  renderDefinitions(analyzedClasses: AnalyzedClass[]) {
    const importManager = new ImportManager();
    const renderedClasses = analyzedClasses.map(analyzedClass => this.renderDefinition(analyzedClass, importManager));
    const imports = importManager.getAllImports();
    return { imports, renderedClasses };
  }

  protected renderDefinition(analyzedClass: AnalyzedClass, imports: ImportManager) {
    const sourceFile = analyzedClass.clazz.declaration.getSourceFile();
    const printer = ts.createPrinter();

    const renderedDefinition = analyzedClass.compilation.statements
      .map(statement => translateStatement(statement, imports))
      .concat(translateStatement(createAssignmentStatement(analyzedClass), imports))
      .map(statement => printer.printNode(ts.EmitHint.Unspecified, statement, sourceFile))
      .join('\n');
    return { analyzedClass, renderedDefinition };
  }
}

/**
 * Create an Angular AST statement node that contains the assignment of the
 * compiled decorator to be applied to the class.
 * @param analyzedClass The info about the class whose statement we want to create.
 */
function createAssignmentStatement(analyzedClass: AnalyzedClass) {
  const compilation = analyzedClass.compilation;
  const name = reflectIdentifierOfDeclaration(analyzedClass.clazz.declaration)!;
  const receiver = new WrappedNodeExpr(name);
  return new WritePropExpr(receiver, compilation.field, compilation.initializer).toStmt();
}