import fs from "node:fs"
import colors from "colors"
import prompt from "prompt-sync"

function main()
{
    const promptFunc = prompt()
    
    let res = -1
    do {
        console.log("Elija la opcion:")
        console.log("1 Crear archivo")
        console.log("2 Leer archivo")
        console.log("3 Modificar archivo")
        console.log("4 Eliminar archivo")
        console.log("0 Salir")
        const option = promptFunc(colors.magenta("Ingrese opcion [0]: "))
        if (option === "0")
            return

        const fileName = promptFunc(colors.magenta("Ingrese el NOMBRE del archivo: "))
    
        const filePath = `./files/${fileName}`
 
        console.log("Opcion elegida -> ", option)

        switch (option) {
            case "1":
                createFile(filePath)
                break;
            case "2":
                leerFile(filePath)
                break;
            case "3":
                editFile(filePath)
                break;
            case "4":
                deleteFile(filePath)
                break;

            default:
                break;
        }




    } while (res !== 0)
}

function createFile(filePath)
{
    console.log("entra a la funcion")
    const promptFunc = prompt()
    const fileContent = promptFunc(colors.blue("Ingrese el contenido del archivo: "))
    const bufferContent = new Uint8Array(Buffer.from(fileContent))

    if (fs.existsSync(filePath)){
        const resp = promptFunc(colors.yellow("El archivo existe, desea sobreescribirlo ? [S] "))
        if (resp !== "S")
            return
    }
    try {
        fs.writeFileSync(filePath, bufferContent )
        console.log(colors.green("✅ archivo creado correctamente"))
    } catch {
        console.error(colors.red("❌ Se produjo un error:", error))
    }

}

const leerFile = (filePath) => {
    
    if (fs.existsSync(filePath)){
        const file = fs.readFileSync(filePath)
        const content = file.toString()
        console.log(colors.blue("\nEl contenido del archivo es el siguiente: \n\n") + colors.cyan(content)  + "\n")
        return content
    } else {
        console.log(colors.yellow("\n\nEl archivo no existe \n\n"))
    }
}

const editFile = (filePath) => {
    
    const promptFunc = prompt()

    if (fs.existsSync(filePath)){
        // editamos
        const content = leerFile(filePath)

        const newContent = promptFunc(colors.blue("\nIngrese el contenido del archivo: "))

        const bufferContent = new Uint8Array(Buffer.from(`${content}\n${newContent}`))
        try {
            fs.writeFileSync(filePath, bufferContent)
            console.log(colors.green("✅ el archivo ha sido editado correctamente"))
        }
        catch {
            console.log(colors.red("❌ El archivo no se ha podido editar correctamente"))
            err => console.error(err)
        }
    }
    else{
        console.log(colors.yellow("Primero debe crear el archivo con la opcion 1"))
       
    }


}

function deleteFile (filePath)
{
     if (!fs.existsSync(filePath)) {
        console.log(colors.red("❌ El archivo no existe"))
        return
    }

    try {
            fs.unlinkSync(filePath)
            console.log(colors.green("✅ El archivo ha sido eliminado correctamente"))
        } catch (err) {
            console.log(colors.red("❌ Error al eliminar el archivo:"), err.message)
        }

}

main()