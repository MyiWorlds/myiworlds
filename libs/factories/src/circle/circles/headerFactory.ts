import { Header } from '@myiworlds/types';

export class HeaderFactory implements Header {
  id: string | null;

  create({
    defaultValues,
    selectedProfileId,
  }: {
    defaultValues: Header;
    selectedProfileId: string;
  }) {
    return {
      ...defaultValues,
      creator: selectedProfileId,
      editors: [selectedProfileId],
    };
  }
}
