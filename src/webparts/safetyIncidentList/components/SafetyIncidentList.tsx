// Utility components
import * as React from 'react';
import * as jquery from 'jquery';
// Custom Components
import { ISafetyIncidentListProps } from './ISafetyIncidentListProps';
import SafetyIncidentListMarkup from './SafetyIncidentListMarkup';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface ISafetyIncidentState {
  incidents: [
    {
      "incidentNumber": "",
      "createdBy": "",
      "location": "",
      "incidentDate": "",
      "incidentType": "",
    }
  ];
  incidentIdSelected: string;
}

export default class SafetyIncidentGetItems extends React.Component<ISafetyIncidentListProps, ISafetyIncidentState> {

  public constructor(props: ISafetyIncidentListProps, state: ISafetyIncidentState) {
    super(props);
    this.state = {
      incidents:
      [{
        "incidentNumber": "",
        "createdBy": "",
        "location": "",
        "incidentDate": "",
        "incidentType": "",
      }],
      incidentIdSelected: ""
    };
    this.onCardClick = this.onCardClick.bind(this);
  }

  public componentDidMount() {
    var reactHandler = this;
    const rootUrl = window.location.origin;
    const listName = "SafetyIncidents";
    jquery.ajax({
      url: rootUrl + "/sites/apps/_api/web/lists/GetByTitle('" + listName + "')/Items",
      type: "GET",
      dataType: "json",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: (resultData) => {
        reactHandler.setState({
          incidents: resultData.d.results,
          incidentIdSelected: ''
        });
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log('jqXHR', jqXHR);
        console.log('text status', textStatus);
        console.log('error', errorThrown);
      }
    });
  }

  // card click listener
  public onCardClick(incident, e) {
    const targetUrl = window.location.origin + "/sites/dev/SitePages/SafetyIncident_" + incident.ID + ".aspx";
    var win = window.open(targetUrl, '_blank');
    win.focus();
  }

  // render function
  public render(): React.ReactElement<ISafetyIncidentListProps> {
    if (this.state.incidents[0].incidentNumber == '') {
      return (
        <div>Loading...</div>
      );
    } else if (this.state.incidentIdSelected == '') {
      const theseIncidents = this.state.incidents;
      return (
        <div>
          <SafetyIncidentListMarkup
            incidents={this.state.incidents}
            handler={this.onCardClick}
          ></SafetyIncidentListMarkup>
        </div>
      );
    } else {
      return (
        <div>Error...</div>
      );
    }
  }
}
