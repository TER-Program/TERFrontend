import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'

function Dokumentumok() {
    const {fetchDokumentumokById, dokumentum, user} = useAuthContext();
  return (
    <div>Sbibidi</div>
  )
}

export default Dokumentumok