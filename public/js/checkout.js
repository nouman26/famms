function increaseProductQuantity(e){
    var quantity=parseInt(e.previousSibling.innerText);
    e.previousSibling.innerText = parseInt(e.previousSibling.innerText) + 1;
    var price=e.parentNode.nextSibling.nextSibling.firstChild.nextSibling.innerText;
    var singleQuantity=parseInt(price)/quantity;
    e.parentNode.nextSibling.nextSibling.firstChild.nextSibling.innerText=singleQuantity*(quantity+1);
    totalProductPrice()
}
function decreaseQuantity(e){
    if(parseInt(e.nextSibling.innerText)!==1){
        var quantity=parseInt(e.nextSibling.innerText);
        e.nextSibling.innerText=parseInt(e.nextSibling.innerText)-1;
        var price=e.parentNode.nextSibling.nextSibling.firstChild.nextSibling.innerText;
        var singleQuantity=parseInt(price)/quantity;
        e.parentNode.nextSibling.nextSibling.firstChild.nextSibling.innerText=singleQuantity*(quantity-1)
        totalProductPrice()
    }
}

function totalProductPrice(){
    var total=0;
    var NoOfItems=document.getElementsByClassName("price");
    for(var i=0;i<NoOfItems.length;i++){
        total=total+parseInt(NoOfItems[i].innerText);
    }
    document.querySelector("body > div > div > div.col-md-8.cart > div.title > div > div.col.align-self-center.text-right.text-muted").innerText=NoOfItems.length+" items";
    document.querySelector("body > div > div > div.col-md-4.summary > div:nth-child(3) > div:nth-child(1)").innerText="ITEM "+NoOfItems.length;
    document.querySelector("body > div > div > div.col-md-4.summary > div:nth-child(3) > div.col.text-right > span").innerText=total;
    document.querySelector("body > div > div > div.col-md-4.summary > form > div > div.col.text-right > span").innerText=total+10;
    document.getElementById("totalPrice").value=total+10;
    document.getElementById("totalItem").value=NoOfItems.length;
}
