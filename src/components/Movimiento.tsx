import React, { CSSProperties, useState } from 'react';
import { Imovimiento } from './Poliza';

const inputStyle: CSSProperties = {
    height: '2rem',
    margin: '0.5rem'
}

const labelStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 3fr',
    margin: '0.5rem 0',
    width: '100%',
}


const MovimientoComp: React.FC<{ movimiento: Imovimiento,updateMov:Function,handleRemoveElement:Function }> = ({movimiento,updateMov,handleRemoveElement}) => {
    
    const [tipo,setTipo] = useState<0|1>(movimiento.tipovMov);
    const [cuenta,setCuenta] = useState<number>(movimiento.cuenta);
    const [importe,setImporte] = useState<number>(movimiento.importe);
    const [concepto,setConcepto] = useState<string>(movimiento.concepto);
    const [guardado,setGuardado] = useState<boolean>(false);
    
    const handleUpdate = () => {
        if(cuenta < 100000000 || cuenta > 999999999) return
        const updatedMovimiento: Imovimiento = {
            id: movimiento.id,
            tipovMov: tipo,
            cuenta: cuenta,
            importe: importe,
            concepto: concepto
        };
        updateMov(movimiento.id, updatedMovimiento);
        setGuardado(true);
    }

    const hanleTipo = (e:React.ChangeEvent<HTMLSelectElement>) => {
        if(!e.target.value){
            alert("Tipo no valido");
            return;
        }
        setGuardado(false)
        setTipo(e.target.value === '0' ? 0 : 1)
    }
    const hanleCuenta = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.value){
            alert("Cuenta no valida");
            return;
        }
        const idCuenta = parseInt(e.target.value);
        setGuardado(false)
        setCuenta(idCuenta) 
    }
    const hanleImporte = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.value){
            alert("Importe no valido");
            return;
        }
        setGuardado(false)
            setImporte(parseInt(e.target.value)) 
    }
    const hanleConcepto = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 30){
            alert("El concepto no puede ser mayor a 30 caracteres");
            return;
        }
        setGuardado(false)
        setConcepto(e.target.value) 

    }


    return (
        <div>
            <div style={labelStyle}>
                <label>Tipo Movimiento</label>
                <label>Cuenta</label>
                <label>Importe</label>
                <label>Concepto</label>
            </div>
            <div style={labelStyle}>
                <select onChange={hanleTipo} style={inputStyle} >
                    <option value="0">Cargo</option>
                    <option value="1">Abono</option>
                </select>
                <input onChange={hanleCuenta} style={inputStyle} type="number" />
                <input onChange={hanleImporte} style={inputStyle} type="number" />
                <input onChange={hanleConcepto} style={inputStyle} type="text" />
            </div>
            <div style={{display:"flex",justifyContent:'space-evenly'}}>
                <button disabled={guardado} onClick={handleUpdate}>Guardar</button>
                <button onClick={() => handleRemoveElement(movimiento.id)}>Remove</button>
            </div>
        </div>
    )
}

export default MovimientoComp