
let filterCategories = function(){


	let substring = fm_tb.value.toUpperCase();
	// for (let i=0; i<fm_cat.length; i++){
	// 	text = fm_cat[i].value.toUpperCase();
	// 	if (text.indexOf(substring) > -1){
	// 		fm_cat[i]
	// 	}
	// }
	// fm_cat = 
};


let removeFilter = function(e){
	e.srcElement.parentElement.remove();
}


let addFilter = function(e){
	// console.log(e.srcElement)
	let text;
	let li = document.createElement('li');

	if (e.type == "change"){
		if (e.srcElement.value == ""){
			return 
		} else{
			text = document.createTextNode(e.srcElement.value);
		}
		
	} else {
		text = document.createTextNode(e.srcElement.innerText);
	}
	
	let a = document.createElement('a');
	a.innerText = 'x';
	a.classList = 'close';
	// a.href = "";
	a.addEventListener('click', removeFilter);

	li.appendChild(text);
	li.appendChild(a);
	fm_fl.appendChild(li);
};



// self-executing function
(function(){
	for (let i=0; i<fm_cat_btn.length; i++){
		fm_cat_btn[i].addEventListener('click', addFilter);
	}

	fm_tb.addEventListener('change', addFilter);

})();




// Event listeners

fm_tb.addEventListener('keyup', filterCategories);