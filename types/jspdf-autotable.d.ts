// Type definitions for jspdf-autotable
import { jsPDF } from 'jspdf';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: AutoTableOptions) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
    internal: {
      events: any;
      scaleFactor: number;
      pageSize: {
        width: number;
        height: number;
        getWidth(): number;
        getHeight(): number;
      };
      pages: number[];
      getEncryptor(objectId: number): (data: string) => string;
      getNumberOfPages(): number;
    };
  }
}

export interface AutoTableSettings {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface AutoTableOptions {
  head?: string[][];
  body?: string[][];
  startY?: number;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  theme?: 'striped' | 'grid' | 'plain';
  pageBreak?: 'auto' | 'avoid' | 'always';
  showHead?: 'everyPage' | 'firstPage' | 'never';
  tableWidth?: number | 'auto' | 'wrap';
  didDrawPage?: (data: { pageNumber: number; settings: AutoTableSettings }) => void;
  styles?: {
    font?: string;
    fontStyle?: string;
    fontSize?: number;
    textColor?: number | [number, number, number];
    fillColor?: number | [number, number, number] | false;
    lineColor?: number | [number, number, number];
    lineWidth?: number;
    cellPadding?: number;
    halign?: 'left' | 'center' | 'right';
    valign?: 'top' | 'middle' | 'bottom';
  };
  headStyles?: {
    font?: string;
    fontStyle?: string;
    fontSize?: number;
    textColor?: number | [number, number, number];
    fillColor?: number | [number, number, number] | false;
    lineColor?: number | [number, number, number];
    lineWidth?: number;
    cellPadding?: number;
    halign?: 'left' | 'center' | 'right';
    valign?: 'top' | 'middle' | 'bottom';
  };
  bodyStyles?: {
    font?: string;
    fontStyle?: string;
    fontSize?: number;
    textColor?: number | [number, number, number];
    fillColor?: number | [number, number, number] | false;
    lineColor?: number | [number, number, number];
    lineWidth?: number;
    cellPadding?: number;
    halign?: 'left' | 'center' | 'right';
    valign?: 'top' | 'middle' | 'bottom';
  };
}