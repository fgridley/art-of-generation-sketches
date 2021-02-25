const scale = 10;
let points = [];
let polygons = [];
const offset = 0;

function setup() {
    createCanvas(1150, 600);
    fill(0);
    strokeWeight(4);
    points = generatePhylloPoints(5000, scale, width, height);
    polygons = generateVoronoi(points, offset);
    drawPolygons(polygons, 'white');
    strokeWeight(2);
    noFill();
    drawPolygons(polygons, 'black');
    drawPhylloPoints(points, 'black');
}

function draw() {
}

function drawPhylloPoints(points, color) {
    stroke(color)
    for (let i = 0; i < points.length; i++) {
        if (points[i].x < offset || points[i].x > width - offset || points[i].y < offset  || points[i].y > height - offset) {
            ellipse(points[i].x, points[i].y,1);
        }
    }
}

