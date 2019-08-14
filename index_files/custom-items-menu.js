function openCustomLinksNav() {
	document.getElementById("custom_links_nav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeCustomLinksNav() {
	document.getElementById("custom_links_nav").style.width = "0";
}

function getCustomLinkItems(){
	return localStorage.getItem('menu-items-custom') ? JSON.parse(localStorage.getItem('menu-items-custom')) : {};
}

function storeCustomLinkItems(menuItems){
	localStorage.setItem("menu-items-custom", JSON.stringify(menuItems));
}

function getDefaultSystemLinks(){
	return window.linkMenu;
}

function buildCustomUserLinksMenu(){
	let linkMenu = getCustomLinkItems();
	let categories = Object.keys(linkMenu);
	let elements = [];
	for(let a=0;a<categories.length;a++){
		if(linkMenu[categories[a]].length < 2){
			continue;
		}
		let svg = "";
		/*
		let svg = linkMenu[categories[a]][0][0].split(`style="`)[0]
			+`style="fill:`+linkMenu[categories[a]][0][1]
			+";"+linkMenu[categories[a]][0][0].split(`style="`)[1];
		*/

		elements.push(`<li class="cat-separator">
		${a == 0 ? `` : `<hr/>`}
		<a style="color:${linkMenu[categories[a]][0][0]} !important">${svg} <span>${categories[a]}</span></a>
		${`<hr/>`}
		</li>`);
		for(let e=1;e<linkMenu[categories[a]].length;e++){
			elements.push(`<li>
			<span class="remove-custom-link"
			data-category="${categories[a]}"
			data-index="${e}"
			onclick="customLinkRemoveConfirmation(event)" >x</span>
			<a target='_blank' class='cat-item' href="${linkMenu[categories[a]][e][1]}">${linkMenu[categories[a]][e][0]}</a></li>`)
		}
	}

	document.getElementById("userCustomLinks").innerHTML = elements.join(`\n`);
}

function getCustomLinkItemsCatImage(category){
	let links = getDefaultSystemLinks();
	return links[category] ? links[category][0] : [];
}

function addCustomLinkToLinkItems(url, title, category, color){
	let linkItems = getCustomLinkItems();
	if(!linkItems[category]){
		linkItems[category] = [];
		linkItems[category].push([color])
	}
	linkItems[category].push([title, url, '']);
	return linkItems;
}

function addCustomLinkToMenu(url, title, category, color){
	storeCustomLinkItems(addCustomLinkToLinkItems(url, title, category, color));
	buildCustomUserLinksMenu();
}

function removeCustomLink(category, index){
	let links = getCustomLinkItems();

	let newList = [];
	for(let i=0;i<links[category].length;i++){
		if(i != index){
			newList.push(links[category][i]);
		}
	}
	if(newList.length < 2){
		delete links[category];
	}else{
		links[category] = newList;
	}
	storeCustomLinkItems(links);
	buildCustomUserLinksMenu();
}


function customLinkRemoveConfirmation(ev) {
	let category = ev.srcElement.attributes['data-category'].nodeValue;
	let index = ev.srcElement.attributes['data-index'].nodeValue;
	
	var label = getCustomLinkItems()[category][index][0];
	confirmModal.style.display = "block";
	overlay.style.display = "block";
  
	document.getElementById('modal-label').innerHTML = label;
	document.getElementById('deleteLink').addEventListener("click", function () {
		removeCustomLink(category, index);
	  	confirmModal.style.display = "none";
	  	overlay.style.display = "none";
	}, { once: true });
}

function setPerfectScrollbar(){
	const ps = new PerfectScrollbar('#custom_links_nav', {
		wheelSpeed: 2,
		wheelPropagation: true,
		minScrollbarLength: 20
	});
	const ps2 = new PerfectScrollbar('#userCustomLinks', {
		wheelSpeed: 2,
		wheelPropagation: true,
		minScrollbarLength: 20
	});
}

(()=>{

	let checkInterval = setInterval(()=>{
		if(linkMenu){
			try{
				buildCustomUserLinksMenu();
				window.addLinkToMenu = (url, name, category)=>{
					category = document.getElementById("custom-category-name").value;
					let color = document.getElementById("custom-category-color").value;
					addCustomLinkToMenu(url, name, category, color);
				}
				setPerfectScrollbar();
			}catch(e){
				console.log(e);
			}
			clearInterval(checkInterval);
		}
	},30);

})()