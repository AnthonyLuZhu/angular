/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {core as compilerCore} from '@angular/compiler';
import * as core from '@angular/core';

{
  describe('compiler core', () => {
    it('Attribute should be equal', () => {
      typeExtends<compilerCore.Attribute, core.Attribute>();
      typeExtends<core.Attribute, compilerCore.Attribute>();
      compareRuntimeShape(new core.Attribute('someName'), compilerCore.createAttribute('someName'));
    });

    it('Inject should be equal', () => {
      typeExtends<compilerCore.Inject, core.Inject>();
      typeExtends<core.Inject, compilerCore.Inject>();
      compareRuntimeShape(new core.Inject('someName'), compilerCore.createInject('someName'));
    });

    it('Query should be equal', () => {
      typeExtends<compilerCore.Query, core.Query>();
      typeExtends<core.Query, compilerCore.Query>();
      compareRuntimeShape(
          new core.ContentChild('someSelector'), compilerCore.createContentChild('someSelector'));
      compareRuntimeShape(
          new core.ContentChild('someSelector', {read: 'someRead'}),
          compilerCore.createContentChild('someSelector', {read: 'someRead'}));
      compareRuntimeShape(
          new core.ContentChildren('someSelector'),
          compilerCore.createContentChildren('someSelector'));
      compareRuntimeShape(
          new core.ContentChildren('someSelector', {read: 'someRead', descendants: false}),
          compilerCore.createContentChildren(
              'someSelector', {read: 'someRead', descendants: false}));
      compareRuntimeShape(
          new core.ViewChild('someSelector'), compilerCore.createViewChild('someSelector'));
      compareRuntimeShape(
          new core.ViewChild('someSelector', {read: 'someRead'}),
          compilerCore.createViewChild('someSelector', {read: 'someRead'}));
      compareRuntimeShape(
          new core.ViewChildren('someSelector'), compilerCore.createViewChildren('someSelector'));
      compareRuntimeShape(
          new core.ViewChildren('someSelector', {read: 'someRead'}),
          compilerCore.createViewChildren('someSelector', {read: 'someRead'}));
    });

    it('Directive should be equal', () => {
      typeExtends<compilerCore.Directive, core.Directive>();
      typeExtends<core.Directive, compilerCore.Directive>();
      compareRuntimeShape(new core.Directive({}), compilerCore.createDirective({}));
    });

    it('Component should be equal', () => {
      typeExtends<compilerCore.Component, core.Component>();
      typeExtends<core.Component, compilerCore.Component>();
      compareRuntimeShape(new core.Component({}), compilerCore.createComponent({}));
    });

    it('Pipe should be equal', () => {
      typeExtends<compilerCore.Pipe, core.Pipe>();
      typeExtends<core.Pipe, compilerCore.Pipe>();
      compareRuntimeShape(
          new core.Pipe({name: 'someName'}), compilerCore.createPipe({name: 'someName'}));
    });

    it('NgModule should be equal', () => {
      typeExtends<compilerCore.NgModule, core.NgModule>();
      typeExtends<core.NgModule, compilerCore.NgModule>();
      compareRuntimeShape(new core.NgModule({}), compilerCore.createNgModule({}));
    });

    it('marker metadata should be equal', () => {
      compareRuntimeShape(new core.Injectable(), compilerCore.createInjectable());
      compareRuntimeShape(new core.Optional(), compilerCore.createOptional());
      compareRuntimeShape(new core.Self(), compilerCore.createSelf());
      compareRuntimeShape(new core.SkipSelf(), compilerCore.createSkipSelf());
      compareRuntimeShape(new core.Host(), compilerCore.createHost());
    });

    it('InjectionToken should be equal', () => {
      compareRuntimeShape(
          new core.InjectionToken('someName'), compilerCore.createInjectionToken('someName'));
    });

    it('non const enums should be equal', () => {
      typeExtends<compilerCore.ViewEncapsulation, core.ViewEncapsulation>();
      typeExtends<core.ViewEncapsulation, compilerCore.ViewEncapsulation>();

      typeExtends<compilerCore.ChangeDetectionStrategy, core.ChangeDetectionStrategy>();
      typeExtends<core.ChangeDetectionStrategy, compilerCore.ChangeDetectionStrategy>();

      typeExtends<compilerCore.SecurityContext, core.SecurityContext>();
      typeExtends<core.SecurityContext, compilerCore.SecurityContext>();

      typeExtends<compilerCore.MissingTranslationStrategy, core.MissingTranslationStrategy>();
      typeExtends<core.MissingTranslationStrategy, compilerCore.MissingTranslationStrategy>();
    });

    it('const enums should be equal', () => {
      expect<number>(compilerCore.NodeFlags.None).toBe(core.ɵNodeFlags.None);
      expect<number>(compilerCore.NodeFlags.TypeElement).toBe(core.ɵNodeFlags.TypeElement);
      expect<number>(compilerCore.NodeFlags.TypeText).toBe(core.ɵNodeFlags.TypeText);
      expect<number>(compilerCore.NodeFlags.ProjectedTemplate).toBe(core.ɵNodeFlags.ProjectedTemplate);
      expect<number>(compilerCore.NodeFlags.CatRenderNode).toBe(core.ɵNodeFlags.CatRenderNode);
      expect<number>(compilerCore.NodeFlags.TypeNgContent).toBe(core.ɵNodeFlags.TypeNgContent);
      expect<number>(compilerCore.NodeFlags.TypePipe).toBe(core.ɵNodeFlags.TypePipe);
      expect<number>(compilerCore.NodeFlags.TypePureArray).toBe(core.ɵNodeFlags.TypePureArray);
      expect<number>(compilerCore.NodeFlags.TypePureObject).toBe(core.ɵNodeFlags.TypePureObject);
      expect<number>(compilerCore.NodeFlags.TypePurePipe).toBe(core.ɵNodeFlags.TypePurePipe);
      expect<number>(compilerCore.NodeFlags.CatPureExpression).toBe(core.ɵNodeFlags.CatPureExpression);
      expect<number>(compilerCore.NodeFlags.TypeValueProvider).toBe(core.ɵNodeFlags.TypeValueProvider);
      expect<number>(compilerCore.NodeFlags.TypeClassProvider).toBe(core.ɵNodeFlags.TypeClassProvider);
      expect<number>(compilerCore.NodeFlags.TypeFactoryProvider).toBe(core.ɵNodeFlags.TypeFactoryProvider);
      expect<number>(compilerCore.NodeFlags.TypeUseExistingProvider)
          .toBe(core.ɵNodeFlags.TypeUseExistingProvider);
      expect<number>(compilerCore.NodeFlags.LazyProvider).toBe(core.ɵNodeFlags.LazyProvider);
      expect<number>(compilerCore.NodeFlags.PrivateProvider).toBe(core.ɵNodeFlags.PrivateProvider);
      expect<number>(compilerCore.NodeFlags.TypeDirective).toBe(core.ɵNodeFlags.TypeDirective);
      expect<number>(compilerCore.NodeFlags.Component).toBe(core.ɵNodeFlags.Component);
      expect<number>(compilerCore.NodeFlags.CatProviderNoDirective)
          .toBe(core.ɵNodeFlags.CatProviderNoDirective);
      expect<number>(compilerCore.NodeFlags.CatProvider).toBe(core.ɵNodeFlags.CatProvider);
      expect<number>(compilerCore.NodeFlags.OnInit).toBe(core.ɵNodeFlags.OnInit);
      expect<number>(compilerCore.NodeFlags.OnDestroy).toBe(core.ɵNodeFlags.OnDestroy);
      expect<number>(compilerCore.NodeFlags.DoCheck).toBe(core.ɵNodeFlags.DoCheck);
      expect<number>(compilerCore.NodeFlags.OnChanges).toBe(core.ɵNodeFlags.OnChanges);
      expect<number>(compilerCore.NodeFlags.AfterContentInit).toBe(core.ɵNodeFlags.AfterContentInit);
      expect<number>(compilerCore.NodeFlags.AfterContentChecked).toBe(core.ɵNodeFlags.AfterContentChecked);
      expect<number>(compilerCore.NodeFlags.AfterViewInit).toBe(core.ɵNodeFlags.AfterViewInit);
      expect<number>(compilerCore.NodeFlags.AfterViewChecked).toBe(core.ɵNodeFlags.AfterViewChecked);
      expect<number>(compilerCore.NodeFlags.EmbeddedViews).toBe(core.ɵNodeFlags.EmbeddedViews);
      expect<number>(compilerCore.NodeFlags.ComponentView).toBe(core.ɵNodeFlags.ComponentView);
      expect<number>(compilerCore.NodeFlags.TypeContentQuery).toBe(core.ɵNodeFlags.TypeContentQuery);
      expect<number>(compilerCore.NodeFlags.TypeViewQuery).toBe(core.ɵNodeFlags.TypeViewQuery);
      expect<number>(compilerCore.NodeFlags.StaticQuery).toBe(core.ɵNodeFlags.StaticQuery);
      expect<number>(compilerCore.NodeFlags.DynamicQuery).toBe(core.ɵNodeFlags.DynamicQuery);
      expect<number>(compilerCore.NodeFlags.CatQuery).toBe(core.ɵNodeFlags.CatQuery);
      expect<number>(compilerCore.NodeFlags.Types).toBe(core.ɵNodeFlags.Types);

      expect<number>(compilerCore.DepFlags.None).toBe(core.ɵDepFlags.None);
      expect<number>(compilerCore.DepFlags.SkipSelf).toBe(core.ɵDepFlags.SkipSelf);
      expect<number>(compilerCore.DepFlags.Optional).toBe(core.ɵDepFlags.Optional);
      expect<number>(compilerCore.DepFlags.Value).toBe(core.ɵDepFlags.Value);

      expect<number>(compilerCore.InjectFlags.Default).toBe(core.InjectFlags.Default);
      expect<number>(compilerCore.InjectFlags.SkipSelf).toBe(core.InjectFlags.SkipSelf);
      expect<number>(compilerCore.InjectFlags.Self).toBe(core.InjectFlags.Self);

      expect<number>(compilerCore.ArgumentType.Inline).toBe(core.ɵArgumentType.Inline);
      expect<number>(compilerCore.ArgumentType.Dynamic).toBe(core.ɵArgumentType.Dynamic);

      expect<number>(compilerCore.BindingFlags.TypeElementAttribute)
          .toBe(core.ɵBindingFlags.TypeElementAttribute);
      expect<number>(compilerCore.BindingFlags.TypeElementClass).toBe(core.ɵBindingFlags.TypeElementClass);
      expect<number>(compilerCore.BindingFlags.TypeElementStyle).toBe(core.ɵBindingFlags.TypeElementStyle);
      expect<number>(compilerCore.BindingFlags.TypeProperty).toBe(core.ɵBindingFlags.TypeProperty);
      expect<number>(compilerCore.BindingFlags.SyntheticProperty)
          .toBe(core.ɵBindingFlags.SyntheticProperty);
      expect<number>(compilerCore.BindingFlags.SyntheticHostProperty)
          .toBe(core.ɵBindingFlags.SyntheticHostProperty);
      expect<number>(compilerCore.BindingFlags.CatSyntheticProperty)
          .toBe(core.ɵBindingFlags.CatSyntheticProperty);
      expect<number>(compilerCore.BindingFlags.Types).toBe(core.ɵBindingFlags.Types);

      expect<number>(compilerCore.QueryBindingType.First).toBe(core.ɵQueryBindingType.First);
      expect<number>(compilerCore.QueryBindingType.All).toBe(core.ɵQueryBindingType.All);

      expect<number>(compilerCore.QueryValueType.ElementRef).toBe(core.ɵQueryValueType.ElementRef);
      expect<number>(compilerCore.QueryValueType.RenderElement).toBe(core.ɵQueryValueType.RenderElement);
      expect<number>(compilerCore.QueryValueType.TemplateRef).toBe(core.ɵQueryValueType.TemplateRef);
      expect<number>(compilerCore.QueryValueType.ViewContainerRef)
          .toBe(core.ɵQueryValueType.ViewContainerRef);
      expect<number>(compilerCore.QueryValueType.Provider).toBe(core.ɵQueryValueType.Provider);

      expect<number>(compilerCore.ViewFlags.None).toBe(core.ɵViewFlags.None);
      expect<number>(compilerCore.ViewFlags.OnPush).toBe(core.ɵViewFlags.OnPush);
    });
  });
}

function compareRuntimeShape(a: any, b: any) {
  const keys = metadataKeys(a);
  expect(keys).toEqual(metadataKeys(b));
  keys.forEach(key => { expect(a[key]).toBe(b[key]); });
  // Need to check 'ngMetadataName' separately, as this is
  // on the prototype in @angular/core, but a regular property in @angular/compiler.
  expect(a.ngMetadataName).toBe(b.ngMetadataName);
}

function metadataKeys(a: any): string[] {
  return Object.keys(a).filter(prop => prop !== 'ngMetadataName' && !prop.startsWith('_')).sort();
}

function typeExtends<T1 extends T2, T2>() {}
