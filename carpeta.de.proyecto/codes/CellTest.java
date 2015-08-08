/**
* <h2>testAddLeftCell()</h2>
* Prueba para verificar que las celdas se configuren correctamente
* al agregar una celda a izquierda
*/
@Test
public void testAddLeftCell() throws Exception {

	this.cell.setLeftCell(this.nextCell);
	assertTrue("Ambas celdas deben quedar correctamente conectadas",
			this.cell.getLeftCell() == this.nextCell &&
			this.nextCell.getRightCell() == this.cell);
}