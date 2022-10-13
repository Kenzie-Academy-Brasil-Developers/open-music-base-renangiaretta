/* Desenvolva sua lógica aqui ... */

const main = document.getElementById('main')
const mainList = document.getElementById('ulDiscs')
const buttonsDiv = document.getElementById('btnDiv')
const sectionButtons = document.getElementById('idFilters')
const sectionRange = document.getElementById('priceRange')
const rangeContainer = document.getElementById('rangeContainer')

let arrFilterDiscs = []

function renderList(list){
    
    if(list.length === 0){  
        return createEmptyList()
    }else{
        return createShowcaseList(list) 
    }   
}

function createShowcaseList(array){
    array.forEach(element => {
        const cardItems = document.createElement('li')
        const cardImg = document.createElement('img')
        const cardContainer = document.createElement('div')
        const cardTag = document.createElement('div')
        const cardBandName = document.createElement('span')
        const cardYear = document.createElement('span')
        const cardDiscTitle = document.createElement('h2')
        const cardContainerPrices = document.createElement('div')
        const cardPrice = document.createElement('span')
        const cardBtnBuy = document.createElement('button')
        
        cardImg.src = element.img 
        cardBandName.innerText = element.band
        cardYear.innerText = element.year
        cardDiscTitle.innerText = element.title
        cardPrice.innerText = `R$ ${element.price},00`
        cardBtnBuy.innerText = "Comprar"

        cardItems.classList = 'card_container_items'
        cardImg.classList = 'card_img'
        cardContainer.classList = 'card_container_texts'
        cardTag.classList = 'card_tag_container flex_row gap-1'
        cardBandName.classList = 'card_tag card_texts'
        cardYear.classList = 'card_tag card_texts'
        cardDiscTitle.classList = 'card_title disc_name'
        cardContainerPrices.classList = 'card_container_prices flex_row justify_between'
        cardPrice.classList = 'card_name disc_name'
        cardBtnBuy.classList = 'card_btn'

        cardContainerPrices.append(cardPrice, cardBtnBuy)
        cardTag.append(cardBandName, cardYear)
        cardContainer.append(cardTag, cardDiscTitle, cardContainerPrices)
        cardItems.append(cardImg, cardContainer)  
        mainList.append(cardItems) 
    });
   return main.append(mainList) 
}

function createEmptyList(){
        let emptyListContainer = document.createElement('div')
        let emptyTexts = document.createElement('p')

        emptyTexts.classList = 'section_titles'
        emptyTexts.innerText = 'Sua pesquisa não encontrou nenhum disco correspondente.'
        emptyListContainer.append(emptyTexts)
        return mainList.append(emptyListContainer)     
}

function createRangeInput(productsList){
    let rangeInput = document.createElement('input')
    let rangeValue = document.createElement('span')
    let orgenizedDiscs = productsList.sort((a,b) => a.price - b.price)

    rangeInput.setAttribute('id', 'rangeInput')
    rangeInput.setAttribute('type', 'range')
    rangeInput.setAttribute('min', `${rangeInput.min = orgenizedDiscs[0].price}`)
    rangeInput.setAttribute('max', `${rangeInput.max = orgenizedDiscs[orgenizedDiscs.length-1].price}`)

    rangeValue.innerText = `Até R$ 0,00`
    rangeValue.setAttribute('id', 'rangeValue')
    rangeValue.classList = 'range_text'

    rangeContainer.append(rangeValue)
    sectionRange.append(rangeInput)
}

function createFilterRange(){
    let rangeInput = document.getElementById('rangeInput')
    let rangeValue = document.getElementById('rangeValue')
    
    rangeInput.addEventListener('mousemove', () =>{
        mainList.innerHTML = ''
        rangeValue.innerText = `Até R$ ${rangeInput.value},00`   
        let filteredList = arrFilterDiscs.filter(object => object.price <= rangeInput.value)
        if(arrFilterDiscs.length != 0) {
            renderList(filteredList)
        }else{
            renderList(arrFilterDiscs)
        }
    })
}

function createButtonsAndFilter(categories, filterList){

    let rangeInput = document.getElementById('rangeInput')

    categories.forEach(genre => {    
        let btnFilter = document.createElement('button')
       
        btnFilter.classList = 'button .dark'

        btnFilter.innerText = genre
    
        btnFilter.addEventListener('click', (event) =>{
            event.preventDefault()
            mainList.innerHTML = ''
            arrFilterDiscs = []

            let filteredCategory = filterList.filter(object => object.category.includes(genre))
            let filterPrice = filteredCategory.filter(object => object.price <= rangeInput.value)    
            let filterPriceAllProducts = filterList.filter(object => object.price <=rangeInput.value) 

            if(btnFilter.innerText == 'Todos'){
                renderList(filterPriceAllProducts)

                filterList.forEach((element) =>{             
                    arrFilterDiscs.push(element)
                })   
            }else{
                renderList(filterPrice) 

                filteredCategory.forEach((element) =>{             
                    arrFilterDiscs.push(element)
                })   
            }   
        })
        buttonsDiv.append(btnFilter)
    })
    return sectionButtons.append(buttonsDiv)
}

createRangeInput(products)
createFilterRange()
createButtonsAndFilter(categories, products)