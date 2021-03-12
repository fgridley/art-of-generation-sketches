const numPoints = 100;
let points = [];
let polygons = [];

function setup() {
    createCanvas(800, 1200);
    // fill(0);
    strokeWeight(7);
    // stroke(255);
    points = createRandomPoints(numPoints);
    polygons = generateVoronoi(points, 0);
    drawPolygons(polygons, 'black');
    strokeWeight(2)
    noFill();
    // drawPolygons(polygons, 'black');
    // drawPoints(points, 'black');
}

function draw() {
}

