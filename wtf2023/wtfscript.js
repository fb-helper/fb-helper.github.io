winners = new Map;
winners.render = function(pad) {
    copybut = document.getElementById('copy');
    if (this.size < 3) {
        pad.value = "(выбрано меньше 3 работ)";
        pad.disabled = true;
        copybut.disabled = true;
    } else {
        pad.value = ""
        for (var winner of this.keys()) {
            pad.value += winner + ' - "' + this.get(winner) + '"' + "\n";
        }
        pad.disabled = false;
        copybut.disabled = false;
    }
}
function toggle(event) {
    var mark = event.target;
    var li = mark.parentNode;
    var ul = li.parentNode;
    var h2 = ul.previousSibling.previousSibling;
    var pseud = h2.textContent;
    if (mark.checked) {
        var a = li.getElementsByTagName('a')[0];
        var work = a.text.trim();
        winners.set(pseud, work);
        for (var li of Array.from(ul.getElementsByTagName('li'))) {
            var inp = li.getElementsByTagName('input')[0];
            if (inp) {
                inp.disabled = true;
            }
        }
        mark.disabled = false;
    } else {
        winners.delete(pseud)
        for (var li of Array.from(ul.getElementsByTagName('li'))) {
            var inp = li.getElementsByTagName('input')[0];
            if (inp) {
                inp.disabled = false;
            }
        }
    }
    winners.render(pad);
}
window.onload = function() {
    hidden = document.getElementById('hidden');
    tog = document.getElementById('toggle');
    marks = document.getElementsByClassName('mark');
    pad = document.getElementById('pad');
    ulmas = document.getElementsByTagName('ul');
    copybut = document.getElementById('copy');
    winners.render(pad)
    for (var mark of Array.from(marks)) {
        mark.checked = false;
        mark.onchange = toggle;
    }
    tog.onchange = function() {
        if (tog.checked) {
            hidden.style.display = 'block';
            for (var mark of Array.from(marks)) {
                mark.style.display = 'inline';
            }
            for (var ulm of Array.from(ulmas)) {
                ulm.className = 'checki';
            }
        } else {
            hidden.style.display = 'none'
            for (var mark of Array.from(marks)) {
                mark.style.display = 'none';
            }
            for (var ulm of Array.from(ulmas)) {
                ulm.className = 'hiddi';
            }
        }
    }
    tog.onchange();
    makeVoc();
}

function copyVoteText() {
    pad = document.getElementById('pad');
    navigator.clipboard.writeText(pad.value);

    var tooltip = document.getElementById("tooltip");
    var count = (pad.value.match(/ 2023 - "/g) || []).length;
    console.log(count);            
    tooltip.innerHTML = "Скопировано строчек: " + count;
}

function outTooltip() {
    var tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "Скопировать в буфер обмена";
}

function makeVoc() {
    const list = document.getElementById('list');
    const arr = list.getElementsByTagName('h2');
    let anchor_dict = {};
    for (const element of arr) {
        let key = element.innerText[4].toUpperCase();
        if (!(key in anchor_dict)){
            anchor_dict[key] = '#alf_' + key;
            element.setAttribute('id', 'alf_' + key);
        }
    }

    const anchors = document.getElementById('anchors');
    for (let key in anchor_dict)  {
        let anchor = document.createElement("a");
        anchor.append(key);
        anchor.setAttribute('href', anchor_dict[key]);
        anchors.append(anchor);
    }
}
