function openFeatures() {
    var allElems = document.querySelectorAll('.elem')//home page mei jis section ke andar sare cards h

    var fullElemPage = document.querySelectorAll('.fullElem')//cards ke andar ke individual pages ka parent section

    var allFullElemsBackBtn = document.querySelectorAll('.fullElem .back') //sare back buttons jo individual cards ke andar h

    //sare card click one par unka perticular page open karna
    allElems.forEach((elem) => {
        elem.addEventListener('click', () => {
            fullElemPage[elem.id].style.display = 'block' //jis bhi card par click hoga uska display none se block ho jayega

            allElems.forEach(elem => {
                elem.style.display = 'none'   //jab koi card open hoga to home page ke elements hide ho jayenge
            })
        })
    })

    allFullElemsBackBtn.forEach((back) => {
        back.addEventListener('click', () => {
            fullElemPage[back.id].style.display = 'none' //jo card open tha uska display none

            allElems.forEach(elem => {
                elem.style.display = 'block'  //jab close button pe click hoga to sare home page ke sare elements firse visible ho jayenge (done for mobile view)
            })
        })
    })
}

openFeatures()

function toDoList() {

    var currentTask = []

    // Check karte hain ki localStorage mei pehle se koi task list saved hai ya nahi
    if (localStorage.getItem('currentTask')) {
        // Agar hai, to use parse karke currentTask array mei store karo
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    }
    else {
        // Agar nahi hai, to console mei message print karo
        console.log("task list is empty")
    }

    // Ye function sare tasks ko HTML ke format mei convert karke page pe show karta hai
    function renderTask() {

        var sum = ''
        var allTask = document.querySelector('.allTask')

        currentTask.forEach((elem, idx) => {
            // Har task ke liye ek card banake sum mei jodte jao
            sum += `<div class="task">
                        <div class="text">
                            <h3>${elem.task}<span class=${elem.imp}>IMP</span></h3>
                            <h5>${elem.details}</h5>
                        </div>
                        <button id=${idx}>Completed</button>
                    </div>`
        })

        // Sare tasks ko .allTask wale container ke andar daal do
        allTask.innerHTML = sum

        // Delete button ka function call karo
        deleteBtn()
    }

    renderTask()  // Page load hote hi existing tasks show karo

    // Form ke elements ko access karo
    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckBox = document.querySelector('.addTask form .importantCheckBox input')

    // Jab user form submit kare (i.e. naya task add kare)
    form.addEventListener('submit', (e) => {
        e.preventDefault()  // Page reload hone se roko

        // Naya task currentTask array mei add karo
        currentTask.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: taskCheckBox.checked
        })

        localStorage.setItem('currentTask', JSON.stringify(currentTask)) // Task list ko localStorage mei dobara save kar do because abhi kuch add hua hai

        // Naya task dikhane ke liye renderTask() call karo
        renderTask()

        // Form ko clear kar do (inputs ko reset)
        taskInput.value = ''
        taskDetailsInput.value = ''
        taskCheckBox.checked = false
    })

    // Ye function har "Completed" button pe click hone par task delete karta hai
    function deleteBtn() {
        var markCompletedBtn = document.querySelectorAll('.task button')

        markCompletedBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                console.log(btn.id)// Button ke id (i.e. index) ko use karke currentTask array se task hata do

                currentTask.splice(btn.id, 1)
                // Updated list dikhane ke liye renderTask() firse call karo

                localStorage.setItem('currentTask', JSON.stringify(currentTask)) // Task list ko localStorage mei dobara save kar do because abhi kuch delete hua hai

                renderTask()
            })
        })
    }

}

toDoList()
