import { CircleBigNumber } from './circles/circleBigNumber';
import { CircleBoolean } from './circles/circleBoolean';
import { CircleData } from './circles/circleData';
import { CircleDate } from './circles/circleDate';
import { CircleDoesNotExist } from './circles/circleDoesNotExist';
import { CircleEdge } from './circles/circleEdge';
import { CircleEdgeNode } from './circles/circleEdgeNode';
import { CircleGeoPoint } from './circles/circleGeoPoint';
import { CircleKeyValue } from './circles/circleKeyValue';
import { CircleLine } from './circles/circleLine';
import { CircleLines } from './circles/circleLines';
import { CircleMediaFontIcon } from './circles/circleMediaFontIcon';
import { CircleMediaImageHref } from './circles/circleMediaImageHref';
import { CircleNumber } from './circles/circleNumber';
import { CirclePermssionDenied } from './circles/circlePermissionDenied';
import { CircleQueryGetDocumentById } from './circles/circleQueryGetDocumentById';
import { CircleQueryGetDocumentsByFilters } from './circles/circleQueryGetDocumentsByFilters';
import { CircleQueryGetDocumentsByIds } from './circles/circleQueryGetDocumentsByIds';
import { CircleString } from './circles/circleString';
import { CircleUI } from './circles/circleUI';
import { CircleViewedByIds } from './circles/circleViewedByIds';
import { PossibleCircleTypes } from '@myiworlds/types';

export class CircleFactory {
  use(type: 'STRING'): CircleString;
  use(type: 'BOOLEAN'): CircleBoolean;
  use(type: 'NUMBER'): CircleNumber;
  use(type: 'BIG_NUMBER'): CircleBigNumber;
  use(type: 'DATE'): CircleDate;
  use(type: 'DATA'): CircleData;
  use(type: 'GEO_POINT'): CircleGeoPoint;
  use(type: 'KEY_VALUE'): CircleKeyValue;
  use(type: 'LINE' | 'UPDATED' | 'CREATED' | 'VIEWED'): CircleLine;
  use(type: 'VIEWED_BY_IDS'): CircleViewedByIds;
  use(type: 'LINES'): CircleLines;
  use(type: 'UI'): CircleUI;
  use(type: 'MEDIA_FONT_ICON'): CircleMediaFontIcon;
  use(type: 'MEDIA_IMAGE_HREF'): CircleMediaImageHref;
  use(type: 'EDGE'): CircleEdge;
  use(type: 'EDGE_NODE'): CircleEdgeNode;
  use(type: 'QUERY_GET_DOCUMENT_BY_ID'): CircleQueryGetDocumentById;
  use(type: 'QUERY_GET_DOCUMENTS_BY_IDS'): CircleQueryGetDocumentsByIds;
  use(type: 'QUERY_GET_DOCUMENTS_BY_FILTERS'): CircleQueryGetDocumentsByFilters;
  use(type: 'PERMISSION_DENIED'): CirclePermssionDenied;
  use(type: 'DOES_NOT_EXIST'): CircleDoesNotExist;

  public use(type: PossibleCircleTypes) {
    switch (type) {
      case 'STRING':
        return new CircleString();

      case 'BOOLEAN':
        return new CircleBoolean();

      case 'NUMBER':
        return new CircleNumber();

      case 'BIG_NUMBER':
        return new CircleBigNumber();

      case 'DATA':
        return new CircleData();

      case 'DATE':
        return new CircleDate();

      case 'GEO_POINT':
        return new CircleGeoPoint();

      case 'KEY_VALUE':
        return new CircleKeyValue();

      case 'LINE':
      case 'UPDATED':
      case 'CREATED':
      case 'VIEWED':
        return new CircleLine();

      case 'VIEWED_BY_IDS':
        return new CircleViewedByIds();

      case 'LINES':
        return new CircleLines();

      case 'MEDIA_FONT_ICON':
        return new CircleMediaFontIcon();

      case 'MEDIA_IMAGE_HREF':
        return new CircleMediaImageHref();

      case 'UI':
        return new CircleUI();

      case 'EDGE':
        return new CircleEdge();

      case 'EDGE_NODE':
        return new CircleEdgeNode();

      case 'QUERY_GET_DOCUMENT_BY_ID':
        return new CircleQueryGetDocumentById();

      case 'QUERY_GET_DOCUMENTS_BY_IDS':
        return new CircleQueryGetDocumentsByIds();

      case 'QUERY_GET_DOCUMENTS_BY_FILTERS':
        return new CircleQueryGetDocumentsByFilters();

      case 'PERMISSION_DENIED':
        return new CirclePermssionDenied();

      case 'DOES_NOT_EXIST':
      default:
        return new CircleDoesNotExist();
    }
  }
}
