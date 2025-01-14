import React, { CSSProperties, useState } from 'react';
import MovimientoComp from './Movimiento';
import { IData } from '../App';
import { TipoPoliza } from '../utils';

const stylePoliza: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '1rem 0',
    alignItems: 'center',
    justifyContent: 'center'
}

const styleMovs: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '1rem',
    alignItems: 'center',
    justifyContent: 'center'
}

const inputStyle: CSSProperties = {
    height: '2rem',
    margin: '0.5rem',
}

export interface Imovimiento {
    id: number,
    tipovMov: 0 | 1,
    cuenta: number,
    importe: number,
    concepto: string
}

const PolizaComp: React.FC<{setData:Function}> = ({setData}) => {

    const [mov, setMov] = useState<Imovimiento[]>([]);
    const [guardado,setGuardado] = useState<boolean>(false);

    const handleRemoveElement = (id: number) => {
        const updatedMovimientos = mov.filter(m => m.id !== id);
        setMov(updatedMovimientos);
    }

    const createNewMov = () => {
        setGuardado(false)
        const newMov: Imovimiento = {
            id: mov.length + 1,
            tipovMov: 0,
            cuenta: 0,
            importe: 0,
            concepto: ''
        }
        setMov([...mov, newMov])
    }

    const updateMov = (id: number, updatedMov: Imovimiento) => {
        const updatedMovimientos = mov.map(m => m.id === id ? updatedMov : m);
        setMov(updatedMovimientos);
    }

    const [fecha,setFecha] = useState<Date>();
    const [tipo,setTipo] = useState<TipoPoliza>(TipoPoliza.Ingreso);
    const [folio,setFolio] = useState<number>();
    const [concepto,setConcepto] = useState<string>();

    const guardarData = () => {
        if(!fecha || !folio || !concepto){
            alert("Faltan datos");
            return;
        }
        const data:IData[] = [
            {
                tipo:"P",
                data:{
                    fecha,
                    tipo,
                    folio,
                    concepto
                }
            }
        ];
        mov.map((m) => {
            data.push({
                tipo:"M1",
                data:m
            })
        });
        setData(data);
        setGuardado(true);
    }

    const handleFecha = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.value){
            alert("Fecha no valida");
            return;
        }
        const f = new Date(e.target.value);
        setFecha(new Date(f.getFullYear(), f.getMonth(), f.getDate()));
        setGuardado(false);
    }

    const handleTipo = (e:React.ChangeEvent<HTMLSelectElement>) => {
        if(!e.target.value){
            alert("Tipo no valido");
            return;
        }
        setTipo(parseInt(e.target.value));
        setGuardado(false);
    }

    const handleFolio = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.value){
            alert("Folio no valido");
            return;
        }
        setFolio(parseInt(e.target.value));
        setGuardado(false);
    }

    const handleConcepto = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 30){
            alert("El concepto no puede ser mayor a 30 caracteres");
            return;
        }
        setConcepto(e.target.value);
        setGuardado(false);
    }

    return (
        <>
            <div style={stylePoliza}>
                <label htmlFor="fecha">Fecha</label>
                <input onChange={handleFecha} style={inputStyle} type="date" />
                <label htmlFor="tipo">Tipo</label>
                <select onChange={handleTipo} style={inputStyle} >
                    <option value="1">Ingreso</option>
                    <option value="2">Egreso</option>
                    <option value="3">Diario</option>
                </select>
                <label htmlFor="folio">Folio</label>
                <input onChange={handleFolio} style={inputStyle} type="number" id="folio" />
                <label htmlFor="concepto">Concepto</label>
                <input onChange={handleConcepto} style={inputStyle} type="text" id="concepto" />
            </div>
            <div style={styleMovs}>
                <button onClick={createNewMov}>Agregar Movimiento</button>
                {!guardado && mov.map((m) => (
                    <div key={m.id}>
                        <MovimientoComp movimiento={m} updateMov={updateMov} handleRemoveElement={handleRemoveElement} />
                    </div>
                ))}
            </div>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'end'}}>
            <button disabled={guardado} onClick={guardarData}>Guardar</button>
            </div>
        </>
    )
}

export default PolizaComp