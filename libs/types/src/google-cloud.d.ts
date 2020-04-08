export interface Service {
  service: string;
  name: string;
  description: string;
  url: () => string;
  // serviceAccounts: ServiceAccount[];
}

export interface GoogleCloudConfig {
  organizationId?: string;
  project: string;
  creatorGmail: string;
  applicationCreatorUser: string;
  applicationCreatorProfile: string;
  services: Service[];
}
