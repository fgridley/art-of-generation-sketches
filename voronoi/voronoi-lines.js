let points = [];
let polygons = [];

function setup() {
    createCanvas(800,1200);
    noFill();
    strokeWeight(5);

    points = generateLines(12, width/2, height/2);
    polygons = generateVoronoi(points, 0);
    
    // drawPoints(points, 'black');
    drawPolygons(polygons, 'black');
}

function draw() {

}

function createLine(numPoints, latitude, xOffset, yOffset) {
    const ringPoints = [];
    const xDist = width / numPoints;
    // const randOffset = random(width/2);
    // const randOffset = xDist / 2;


    for (let i = 0; i < numPoints; i++) {
        const randOffset = random(-10,10);
        const x = randOffset + (xDist * i) + (xDist / 2);
        ringPoints.push({x: x, y: latitude + random(-10,10)});
    }

    return ringPoints;
}

function generateLines(lines, xOffset, yOffset) {
    let linePoints = []
    let latitudes = []
    for (let i = 0; i < lines; i++) {
        let latitudeTooClose = false;
        const latitude = round(random(height));
        latitudes.forEach((latitude1) => {
            if (latitude > latitude1 - 5 && latitude < latitude1 + 5) {
                latitudeTooClose = true;
            }
        })
        if (!latitudeTooClose) {
            latitudes.push(latitude);
            const numPoints = round(random(1, 15));
            linePoints = linePoints.concat(createLine(numPoints, latitude, xOffset, yOffset))
        }
    }
    return linePoints;
}