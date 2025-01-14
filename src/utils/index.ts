import { v4 as uuidv4 } from 'uuid';

export enum TipoPoliza {
	Ingreso = 1,
	Egreso = 2,
	Diario = 3
}

export class Poliza{
    Clave: 'P';
    Fecha: Date;
    TipoPol: TipoPoliza;
    Folio: number;
    Clase: 1;
    IdDiario: 0;
    Concepto: string;
    SistOrig: 11;
    Impresa: 0;
    Ajuste: 0;
    Guid: string;

    constructor(Fecha: Date, TipoPol: TipoPoliza, Folio: number, Concepto: string) {
        this.Clave = 'P';
        this.Fecha = Fecha;
        this.TipoPol = TipoPol;
        this.Folio = Folio;
        this.Clase = 1;
        this.IdDiario = 0;
        this.Concepto = Concepto;
        this.SistOrig = 11;
        this.Impresa = 0;
        this.Ajuste = 0;
        this.Guid = uuidv4();
    }

	toArray(): any[] {
		return [
			this.Clave,
			this.Fecha,
			this.TipoPol,
			this.Folio,
			this.Clase,
			this.IdDiario,
			this.Concepto,
			this.SistOrig,
			this.Impresa,
			this.Ajuste,
			this.Guid,
		];
	}
}

export class Movimiento{
    Clave: 'M1';
    IdCuenta: number;
    Referencia: string;
    TipoMovto: 0 | 1;
    Importe: number;
    IdDiario: 0;
    ImporteME: 0;
    Concepto: string;
    IdSegNeg: "";
    Guid: string;

    constructor(IdCuenta: number, TipoMovto: 0 | 1, Importe: number, Concepto: string = "", Referencia: string = "") {
        this.Clave = 'M1';
        this.IdCuenta = IdCuenta;
        this.Referencia = Referencia;
        this.TipoMovto = TipoMovto;
        this.Importe = Importe;
        this.IdDiario = 0;
        this.ImporteME = 0;
        this.Concepto = Concepto;
        this.IdSegNeg = "";
        this.Guid = uuidv4();
    }

	toArray(): any[] {
		return [
			this.Clave,
			this.IdCuenta,
			this.Referencia,
			this.TipoMovto,
			this.Importe,
			this.IdDiario,
			this.ImporteME,
			this.Concepto,
			this.IdSegNeg,
			this.Guid,
		];
	}
	
}

import xlsx from "xlsx";

export const generarXLSX = async (data:any[]) => {
	const pestana = xlsx.utils.json_to_sheet(data, {
		skipHeader: true,
	});
	const libro = xlsx.utils.book_new();
	xlsx.utils.book_append_sheet(libro, pestana, "Sheet1");
	xlsx.writeFile(libro, "./output.xlsx");
}