import { CSSProperties, useState } from 'react';
import './App.css'
import { generarXLSX, Movimiento, Poliza, TipoPoliza } from './utils'
import PolizaComp from './components/Poliza';

const polizaStyle: CSSProperties = {
	display: 'flex',
	width: '100%',
	padding: '1rem',
	border: '1px solid #ccc',
	borderRadius: '5px',
	margin: '1rem 0'
}

export interface IData {
	tipo: 'P' | 'M1';
	data: {
		fecha: Date;
		tipo: TipoPoliza;
		folio: number;
		concepto: string;
	} | {
		cuenta: number;
		tipovMov: 0 | 1;
		importe: number;
		concepto: string;
	};
}

function App() {

	const [data, setData] = useState<IData[]>([])
	const [editWindow, setEditWindow] = useState(false)
	const handlePoliza = () => setEditWindow(!editWindow)

	const handleGenerateFile = () => {
		
		let dataPoliza: any[] = [];

		if (data.length === 0) return;

		if(data.filter((d: IData) => d.tipo === 'P').length === 0){
			alert("No hay polizas Guardadas");
			return;
		}

		if(data.filter((d: IData) => d.tipo === 'M1').length === 0){
			alert("No hay movimientos Guardados");
			return;
		}

		data.map((d: IData) => {
			if (d.tipo === 'P') {
				const { fecha, tipo, folio, concepto } = d.data as {
					fecha: Date;
					tipo: TipoPoliza;
					folio: number;
					concepto: string;
				};
				const newFecha = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
				dataPoliza.push(new Poliza(newFecha, tipo, folio, concepto).toArray());
			} else {
				const { cuenta, tipovMov, importe, concepto } = d.data as {
					cuenta: number;
					tipovMov: 0 | 1;
					importe: number;
					concepto: string;
				};
				dataPoliza.push(new Movimiento(cuenta, tipovMov, importe, concepto).toArray());
			}
		});
		generarXLSX(dataPoliza);
	}

	return (
		<>
			<h1>JS to ContpaqI Contabilidad</h1>
			<button onClick={handlePoliza}>Nueva Poliza</button>
			<div style={polizaStyle}>
				{editWindow && <PolizaComp setData={setData} />}
			</div>
			<div className="card">
				<button onClick={handleGenerateFile}>Generar Archivo</button>
			</div>
		</>
	)
}

export default App
