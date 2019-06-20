'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">analisis-conceptual documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-def62fb7c3072f6ff4d764e9941db011"' : 'data-target="#xs-components-links-module-AppModule-def62fb7c3072f6ff4d764e9941db011"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-def62fb7c3072f6ff4d764e9941db011"' :
                                            'id="xs-components-links-module-AppModule-def62fb7c3072f6ff4d764e9941db011"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BackComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BackComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CargarDataBaseComponentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CargarDataBaseComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardAnalysisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardAnalysisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataBaseComponentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataBaseComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiagramEditorAlumnoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiagramEditorAlumnoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiagramEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiagramEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiagramEditorComponentComparator.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiagramEditorComponentComparator</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignInComponentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignInComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableListadoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableListadoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-def62fb7c3072f6ff4d764e9941db011"' : 'data-target="#xs-injectables-links-module-AppModule-def62fb7c3072f6ff4d764e9941db011"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-def62fb7c3072f6ff4d764e9941db011"' :
                                        'id="xs-injectables-links-module-AppModule-def62fb7c3072f6ff4d764e9941db011"' }>
                                        <li class="link">
                                            <a href="injectables/ExportPDFServiceService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ExportPDFServiceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ExportPDFServiceService-1.html" data-type="entity-link">ExportPDFServiceService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});