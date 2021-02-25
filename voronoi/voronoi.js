const numPoints = 4000;
let points = [];
let polygons = [];

function setup() {
    createCanvas(1150, 600);
    fill(0);
    strokeWeight(4);
    // stroke(255);
    points = createRandomPoints(numPoints);
    polygons = generateVoronoi(points, 0);
    drawPolygons(polygons, 'white');
    strokeWeight(2)
    noFill();
    drawPolygons(polygons, 'black');
    // drawPoints(points, 'black');
}

function draw() {
}

