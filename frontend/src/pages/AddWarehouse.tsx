import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AlertCircle } from "lucide-react"

export default function AddWarehouse() {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleClick = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.post(
        "http://localhost:8787/addwarehouse",
        { name, location },
        {
          headers: {
            token: token,
          },
        }
      )
      console.log(response.data)
      navigate("/warehouses")
    } catch (error) {
      console.error("Error adding warehouse:", error)
      setError("Failed to add warehouse. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add New Warehouse</h2>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="warehouse-name" className="sr-only">
                Warehouse Name
              </label>
              <input
                id="warehouse-name"
                name="warehouse-name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Warehouse Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="warehouse-location" className="sr-only">
                Warehouse Location
              </label>
              <input
                id="warehouse-location"
                name="warehouse-location"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Warehouse Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleClick}
            >
              Add Warehouse
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}