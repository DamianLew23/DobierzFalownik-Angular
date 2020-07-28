export interface InverterFilterCriteria {
  producerSlug?: string;
  seriesSlug?: string;
  supplyVoltageSymbolSlug?: string;
  outputVoltageSymbolSlug?: string;
  powerMin?: number;
  powerMax?: number;
  currentMin?: number;
  currentMax?: number;
}
