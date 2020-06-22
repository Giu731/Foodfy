const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")   

for(item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}


const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5,
    files: [],
    handleFileInput(event){
        const { files: fileList} = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()
            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }
            reader.readAsDataURL(file)
        })
        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event){
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList} = input

        if ( fileList.length > uploadLimit ){
            alert(`Envie até ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value=="photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if( totalPhotos > uploadLimit){
            alert("Você ultrapassou o limite de fotos")
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles(){
        const dataTranfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTranfer.items.add(file))

        return dataTranfer.files
    },
    getContainer(image){
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())
        return div
    },
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event){
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event){
        const photoDiv = event.target.parentNode

        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if(removedFiles){
                removedFiles.value += `${photoDiv.id},`
            }
        }
        photoDiv.remove()
    }
}

const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(e){
        const { target } = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
        target.classList.add('active')

        ImageGallery.highlight.src = target.src
    }
}

const AvatarUpload = {
    input: "",
    preview: document.querySelector('#photos-preview-avatar'),
    uploadLimit: 1,
    files: [],
    handleFileInput(event){
        const { files: fileList } = event.target
        AvatarUpload.input = event.target
        if(AvatarUpload.hasLimit(event)) return
        
        console.log("funciona")

        Array.from(fileList).forEach(file => {

            AvatarUpload.files.push(file)

            const reader = new FileReader()
            console.log(file)
            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = AvatarUpload.getContainer(image)
                
                AvatarUpload.preview.appendChild(div)
            }
            reader.readAsDataURL(file)
            console.log("criei a div")
        })

        AvatarUpload.input.files = AvatarUpload.getAllFiles()
        console.log(AvatarUpload.input.files)
        console.log("adicionei aos arquivos")
    },
    hasLimit(event){
        const {uploadLimit, input, preview } = AvatarUpload
        const { files: fileList } =input

        if(fileList.length > uploadLimit){
            alert(`Você ultrapassou o limite (${uploadLimit}) de arquivos`)
            event.preventDefault()
            return true
        }

        const avatarDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "avatar")
            avatarDiv.push(item)
        })

        const totalPhotos = fileList.length + avatarDiv.length
        if(totalPhotos > uploadLimit){
            alert("Você ultrapassou o limite de fotos")
            event.preventDefault()
            return true
        }
        return false
    },
    getAllFiles(){
        const dataTranfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        AvatarUpload.files.forEach(file => dataTranfer.items.add(file))

        return dataTranfer.files
    },
    getContainer(image){
        const div = document.createElement('div')
        div.classList.add('avatar')

        div.onclick = AvatarUpload.removeAvatar
        const input = document.createElement('input')
        input.type = "url"
        input.name = "avatar"
        div.appendChild(input)
        input.value = `${image.src}`
        // div.appendChild(image)
        console.log(`essa é a ${image.url}`)

        return div
    },
    removeAvatar(event){
        const avatarDiv = event.target.parentNode
        const avatarArray = Array.from(AvatarUpload.preview.children)
        const index = avatarArray.indexOf(avatarDiv)

        AvatarUpload.files.splice(index, 1)
        AvatarUpload.input.files = AvatarUpload.getAllFiles()

        avatarDiv.remove()
    },
    removeOldAvatar(event){
        const avatarDiv = event.target.parentNode
        console.log(avatarDiv)

        if(avatarDiv.id){
            const removedFiles = document.querySelector(`input[name = "removed_files"]`)
            if(removedFiles){
                removedFiles.value += `${avatarDiv.id},` 
            }
        }
        avatarDiv.remove()
    }
}

const Adding = {
    addIngredientButton: document.querySelector(".add-ingredient"),
    addDescriptionButton: document.querySelector(".add-step"),
    addIngredient(){
        const ingredients = document.querySelector("#ingredients")
        const fieldContainer = document.querySelectorAll(".ingredient")
    
        const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
        if (newField.children[0].value == "") return false
    
        newField.children[0].value = ""
        ingredients.appendChild(newField)
    },
    addSteps(){
        const steps = document.querySelector("#steps")
        const fieldContainer = document.querySelectorAll(".step")
    
        const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
        if (newField.children[0].value == "") return false
    
        newField.children[0].value = ""
        steps.appendChild(newField)
    }

}

const Validate = {
    apply(input, func){
        Validate.clearErrors(input)

        let results = Validate[func](input.value)
        input.value = results.value

        if(results.error)
            Validate.displayError(input, results.error)
        

    },
    displayError(input, error){
        const div = document.createElement('div')
        div.classList.add('error')
        div.innerHTML = error
        input.parentNode.appendChild(div)
        input.focus()
    },
    clearErrors(input){
        const errorDiv = input.parentNode.querySelector(".error")
        if(errorDiv)
        errorDiv.remove()
    },
    isEmail(value){
        let error = null

        const mailFormat = /^\w+([\.-]\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!value.match(mailFormat))
        error = "Email inválido"

        return{
            error,
            value
        }
    }
}
const formUser = document.querySelectorAll('.Session.user'),


