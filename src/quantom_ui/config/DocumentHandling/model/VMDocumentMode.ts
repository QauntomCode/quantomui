import { DocumentDtoModel } from "./DocumentDtoModel";

export interface VMDocumentModel {
    documents?: DocumentDtoModel[]; // List of DocumentDto objects.
    TransNo?: string;
    MenuCode?: string;
}