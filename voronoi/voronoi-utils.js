function createRandomPoints(numPoints, offset = 0) {
    points = [];
    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: round(random(offset, width - offset)),
            y: round(random(offset, height - offset))
        });
    }
    return points;
}

function generateVoronoi(points, offset) {
    const arrayPoints = pointObjectsToArray(points);
    const delaunay = Delaunay.from(arrayPoints);
    const voronoi = delaunay.voronoi([offset, offset, width-offset, height-offset]);
    const polygons = voronoi.cellPolygons();
    
    const flattenedPolygons = flattenPolygons(polygons);
    return flattenedPolygons;
}

function pointObjectsToArray(points) {
    return points.map(point => [point.x, point.y])
}

function flattenPolygons(polygons) {
    const polygonsArray = [];
    for (polygon of polygons) {
        const verticesArray = [];
        for (vertices of polygon) {
            verticesArray.push({x: vertices[0], y: vertices[1]});
        }
        polygonsArray.push(verticesArray);
    }
    return polygonsArray;
}

function drawPolygons(polygons, color) {
    stroke(color)
    for (let i = 0; i < polygons.length; i++) {
        beginShape();

        for (var j = 0; j < polygons[i].length; j++) {
            vertex(polygons[i][j].x, polygons[i][j].y);
        }
        
        endShape();
    }
}

function drawPoints(points, color) {
    stroke(color)
    for (var i = 0; i < points.length; i++) {
        ellipse(points[i].x, points[i].y, 1);
    }
}

function saveSVG() {

}