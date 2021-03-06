import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteIncident } from '../../store/fetchActions/NewIncidents/Index'
import { getIncidents } from '../../store/fetchActions/Profile/Index'
import { Link } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logoutService from '../../Services/logoutService'
import './style.css'
import logoImg from '../../assets/logo.svg'

export default function Profile() {
    const [incidents, setIncidents] = useState([])

    const incidentOng = useSelector((state) => state.profile)
    const isAuthenticated = useSelector((state) => state.auth)

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getIncidents(ongId))
    }, [ongId, dispatch])

    useEffect(() => {
        setIncidents(incidentOng)
    }, [incidentOng])


    async function handleDeleteIncidents(id) {
        try {
            dispatch(deleteIncident(id, ongId))
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout() {
        isAuthenticated && dispatch(logoutService())
    }
    
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',
                            { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncidents(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>

                ))}
            </ul>
        </div>
    )
}
