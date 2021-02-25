let points = [];
let polygons = [];

function setup() {
    createCanvas(1100,600);
    noFill();

    points = generateRings(10, width/2, height/2);
    polygons = generateVoronoi(points, 0);
    
    // drawPoints(points, 'black');
    drawPolygons(polygons, 'black');
}

function draw() {

}

function createRing(numPoints, radius, xOffset, yOffset) {
    const ringPoints = [];
    const angle = 360 / numPoints;

    for (let i = 0; i < numPoints; i++) {
        const curAngle = angle * i;
        const x = radius * Math.cos(radians(curAngle)) + xOffset
        const y = radius * Math.sin(radians(curAngle)) + yOffset
        ringPoints.push({x: x, y: y});
    }

    return ringPoints;
}

function generateRings(rings, xOffset, yOffset) {
    let ringPoints = []
    for (let i = 0; i < rings; i++) {
        const radius = round(random(width/2));
        const numPoints = round(random(100));
        ringPoints = ringPoints.concat(createRing(numPoints, radius, xOffset, yOffset))
    }
    return ringPoints;
}