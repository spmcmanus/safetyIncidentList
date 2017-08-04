// React
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Styling
import styles from '../resources/SafetyIncidentList.module.scss';

// Office-Ui Fabric Components
import {
	DocumentCard,
	DocumentCardTitle,
	DocumentCardActivity,
	DocumentCardPreview,
	DocumentCardActions,
	IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
// Custom components and properties
import { ISafetyIncidentListProps } from './ISafetyIncidentListProps';

// local state
export interface localState {
	showModal: boolean;
}

// component class definition
export default class SafetyIncidentListMarkup extends React.Component<any, any> {

	// constructor
	public constructor(props: ISafetyIncidentListProps, state: localState) {
		super(props);
		this.state = {
			showModal: false
		};
	}


	// return loading if the incidents state has not yet been set
	public render(): React.ReactElement<ISafetyIncidentListProps> {

		const incidents = this.props.incidents.slice(0, this.props.showRecentIncidents);
		const handler = this.props.handler;
		let previewURL = '';

		if (!incidents) {
			return <div>Loading...</div>;
		}
		let previewProps: IDocumentCardPreviewProps = {
			previewImages: [
				{
					url: 'http://placehold.it/150x150',
					imageFit: ImageFit.cover,
					width: 150,
					height: 150
				}
			],
		};
		// return list of incidents
		return (
			<div className={styles.panelStyle} >
				<div className={styles.tableStyle} >
					<div className="ms-Grid">
						<div className="ms-Grid-row">
							{incidents.map((incident, key) => {

								if (incident.incidentPhotos != null) {
									previewURL = incident.incidentPhotos.Url;
								} else {
									previewURL = 'http://placehold.it/213x150';
								}

								const thisPreviewProps: IDocumentCardPreviewProps = {
									previewImages: [
										{
											previewImageSrc: previewURL,
											imageFit: ImageFit.cover,
											width: 213,
											height: 150
										}
									],
								};

								return (
									<div className={styles.incidentCardContainer} key={key}>
										<DocumentCard
											className={styles.incidentCard}
											onClick={handler.bind(this, incident)}
										>
											<DocumentCardPreview { ...thisPreviewProps } />
											<div className={styles.docCardType}>Safety Incident</div>
											<DocumentCardTitle
												title={incident.incidentType}
												shouldTruncate={true}
											/>
											<DocumentCardActivity
												activity={incident.incidentDate}
												people={[
													{ name: incident.createdBy, profileImageSrc: '' }
												]}
											/>
										</DocumentCard>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div >
		);
	}
}