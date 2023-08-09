import {Link} from "react-router-dom"

export default function Restricted() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-semibold mb-4">Página restringida</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Regístrate y/o inicia sesión para acceder a esta página.
                </p>
                {/* <img
            src="https://s3-us-west-2.amazonaws.com/misionadmision-informacion/miscelanea/contenido-restringido-por-evaluacion-diagnostica.gif" 
            className="max-w-xs mx-auto mb-4"
          /> */}
                <Link
                    to="/login"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg inline-block"
                >
                    Iniciar sesión
                </Link>
                <span className="mx-2 text-gray-500">o</span>
                <Link
                    to="/login"
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg inline-block"
                >
                    Registrarse
                </Link>
            </div>
        </div>
    )
}