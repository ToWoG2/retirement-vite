import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const handleAuth = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        alert('Login erfolgreich!')
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        alert('Registrierung erfolgreich! Bitte bestätige deine Email.')
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Registrierung'}
        </h2>
        
        <form onSubmit={handleAuth}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Lädt...' : (isLogin ? 'Anmelden' : 'Registrieren')}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm">
          {isLogin ? 'Noch kein Konto?' : 'Bereits registriert?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-500 hover:underline"
          >
            {isLogin ? 'Registrieren' : 'Anmelden'}
          </button>
        </p>
      </div>
    </div>
  )
}