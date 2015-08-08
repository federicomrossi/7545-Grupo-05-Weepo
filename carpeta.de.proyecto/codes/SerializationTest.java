package com.tdd.tp1.pacman;

public class App {

    public static void main( String[] args ) {
    	
    	if (args.length < 1) {
    		System.out.print("Por favor ingrese por parametro la ruta de la carpeta resources\n");
    		return;
    	}
    	
    	String resourcesPath = args[0];

    	InputStream labyrinthConfigStream = null;
    	try {
    		labyrinthConfigStream = new FileInputStream(resourcesPath + "/labyrinthConfig.xml");
		} catch (FileNotFoundException e) {
			System.out.print("No se pudo leer el archivo de configuracion del laberinto\n");
		}
    	
    	if (labyrinthConfigStream != null) {
    		
    		LabyrinthGenerator generator = new LabyrinthGenerator();
    		Labyrinth labyrinth = null;
    		try {
				labyrinth = generator.generateLabyrinth(labyrinthConfigStream);
			} catch (ParserConfigurationException | SAXException | IOException e) {
				System.out.print("No se pudo generar el laberinto\n");
				return;
			}
    		
    		// TEMP
    		PacmanControllerXML pacmanController = new PacmanControllerXML(resourcesPath, labyrinth.getPacman());
    		LabyrinthViewXML labyrinthView = new LabyrinthViewXML(resourcesPath, labyrinth);
    		
    		while(pacmanController.loadStatus()) {
    			labyrinthView.refreshStatus();
    		}
    		// END TEMP
    	}
    }
}
