class Iblock {
    constructor() {
        this.color = "#1ae1fc";
        this.tiles = [
            { x: 4, y: 1, color:this.color},
            { x: 6, y: 1, color:this.color},
            { x: 5, y: 1, color:this.color},
            { x: 7, y: 1, color:this.color}
        ];
        this.tiles.forEach((element) => {
            let cell = document.querySelector(`#row${element.y} #column${element.x}`);
            // cell.innerHTML = "X";
            cell.style.color = this.color;
            cell.style.backgroundColor = this.color;
        });
    }
}
class Jblock {
    constructor() {
        this.color = "#0a34bd";
        this.tiles = [
            { x: 4, y: 1, color:this.color},
            { x: 5, y: 2, color:this.color},
            { x: 4, y: 2, color:this.color},
            { x: 6, y: 2, color:this.color}
        ];
        this.tiles.forEach((element) => {
            let cell = document.querySelector(`#row${element.y} #column${element.x}`);
            // cell.innerHTML = "X";
            cell.style.color = this.color;
            cell.style.backgroundColor = this.color;
        });
    }
}
class Lblock {
    constructor() {
        this.color = "#ff8800";
        this.tiles = [
            { x: 6, y: 1, color:this.color},
            { x: 5, y: 2, color:this.color},
            { x: 4, y: 2, color:this.color},
            { x: 6, y: 2, color:this.color}
        ];
        this.tiles.forEach((element) => {
            let cell = document.querySelector(`#row${element.y} #column${element.x}`);
            // cell.innerHTML = "X";
            cell.style.color = this.color;
            cell.style.backgroundColor = this.color;
        });
    }
}
class Oblock {
    constructor() {
        this.color = "#ffe600";
        this.tiles = [
            { x: 5, y: 1, color:this.color},
            { x: 5, y: 2, color:this.color},
            { x: 6, y: 1, color:this.color},
            { x: 6, y: 2, color:this.color}
        ];
        this.tiles.forEach((element) => {
            let cell = document.querySelector(`#row${element.y} #column${element.x}`);
            // cell.innerHTML = "X";
            cell.style.color = this.color;
            cell.style.backgroundColor = this.color;
        });
    }
}
class Sblock {
    constructor() {
        this.color = "#0cd10c";
        this.tiles = [
            { x: 6, y: 1, color:this.color },
            { x: 5, y: 1, color:this.color },
            { x: 4, y: 2, color:this.color },
            { x: 5, y: 2, color:this.color }
        ];
        this.tiles.forEach((element) => {
            let cell = document.querySelector(`#row${element.y} #column${element.x}`);
            // cell.innerHTML = "X";
            cell.style.color = this.color;
            cell.style.backgroundColor = this.color;
        });
    }
}
class Tblock {
    constructor() {
        this.color = "#961396";
        this.tiles = [
            { x: 4, y: 2, color:this.color},
            { x: 5, y: 2, color:this.color},
            { x: 6, y: 2, color:this.color},
            { x: 5, y: 1, color:this.color}
        ];
        this.tiles.forEach((element) => {
            let cell = document.querySelector(`#row${element.y} #column${element.x}`);
            // cell.innerHTML = "X";
            cell.style.color = this.color;
            cell.style.backgroundColor = this.color;
        });
    }
}
class Zblock {
    constructor() {
        this.color = "#eb0f0f";
        this.tiles = [
            { x: 4, y: 1 ,color:this.color},
            { x: 5, y: 1 ,color:this.color},
            { x: 5, y: 2 ,color:this.color},
            { x: 6, y: 2 ,color:this.color}
        ];
        this.tiles.forEach((element) => {
            let cell = document.querySelector(`#row${element.y} #column${element.x}`);
            // cell.innerHTML = "X";
            cell.style.color = this.color;
            cell.style.backgroundColor = this.color;
        });
    }
}