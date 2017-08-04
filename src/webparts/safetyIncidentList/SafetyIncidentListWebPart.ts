import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';

import SafetyIncidentList from './components/SafetyIncidentList';
import { ISafetyIncidentListProps } from './components/ISafetyIncidentListProps';
import { ISafetyIncidentListWebPartProps } from './ISafetyIncidentListWebPartProps';

export default class SafetyIncidentListWebPart extends BaseClientSideWebPart<ISafetyIncidentListWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISafetyIncidentListProps > = React.createElement(SafetyIncidentList);
    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return null;
  }
}
