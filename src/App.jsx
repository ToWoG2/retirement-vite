import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import RetirementPlannerWithStorage from './RetirementPlannerWithStorage'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Prüfe aktuelle Session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Überwache Auth-Änderungen
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Lädt...</div>
      </div>
    )
  }

  if (!session) {
    return <Auth />
  }

  return (
    <div>
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Retirement Planner</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{session.user.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
      <RetirementPlannerWithStorage />
    </div>
  )
}