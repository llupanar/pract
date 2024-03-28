import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;


public class Menu {
    public void menu(String DB_URL, String USER, String PASS) {
        DBHandler db = new DBHandler();
        Connection connection = db.connectToDb(DB_URL, USER, PASS);
        Integer selectedTable=1;
        do {
            ConsoleIO menuIO = new ConsoleIO();
            ArrayList<String> tables = menuIO.dbTablePrint(connection);
            selectedTable = menuIO.numberInput(0, tables.size());
            if(selectedTable!=0 && selectedTable>=1){
                Integer selectedAction=0;
                do{
                    menuIO.printMenu(tables.get((selectedTable-1)));
                    selectedAction = menuIO.numberInput(0, 4);
                    if(selectedAction!=0&& selectedTable>=1){
                        crud_handler(db,connection,tables.get((selectedTable-1)),selectedAction);
                    }

                }while(selectedAction!=0);
            }
        } while (selectedTable != 0);
    }

    public void crud_handler(DBHandler db, Connection connection,String tableName,Integer value){
        ConsoleIO cons=new ConsoleIO();
        switch (value){
            case(1):
                db.showData(connection,tableName);
                break;
            case(2):
                String addRow=cons.addRowInput(connection,tableName);
                System.out.println(addRow);
                db.addRow(connection,tableName,addRow);
                break;
            case(3):
                List<String> requests=cons.stringsInput();
                db.editRow(connection,tableName,requests);
                break;
            case(4):
                System.out.print("DELETE FROM "+tableName+" WHERE ");
                String delete_key=cons.stringInput();
                db.removeRow(connection,tableName,delete_key);
                break;
            default:break;
        }
    }

}
