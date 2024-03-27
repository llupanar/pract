import java.sql.Connection;
import java.util.ArrayList;


public class Menu {
    public void menu(String DB_URL, String USER, String PASS) {
        DBHandler db = new DBHandler();
        Connection connection = db.connectToDb(DB_URL, USER, PASS);
        Integer utable=1;
        do {
            ConsoleIO menuIO = new ConsoleIO();
            ArrayList<String> tables = menuIO.dbTablePrint(connection);
            utable = menuIO.numberInput(0, tables.size());
            if(utable!=0 && utable>=1){
                Integer value=0;
                do{
                    menuIO.printMenu(tables.get((utable-1)));
                    value = menuIO.numberInput(0, 4);
                    if(value!=0&& utable>=1){
                        crud_handler(db,connection,tables.get((utable-1)),value);
                    }

                }while(value!=0);
            }
        } while (utable != 0);
    }

    public void crud_handler(DBHandler db, Connection connection,String table_name,Integer value){
        ConsoleIO cons=new ConsoleIO();
        switch (value){
            case(1):
                db.showData(connection,table_name);
                break;
            case(2):
                String add_row=cons.addRowInput(connection,table_name);
                System.out.println(add_row);
                db.addRow(connection,table_name,add_row);
                break;
            case(3):
                System.out.println("Enter your SQL request");
                String request=cons.string_input();
                db.editRow(connection,table_name,request);
                break;
            case(4):
                System.out.print("DELETE FROM "+table_name+" WHERE ");
                String delete_key=cons.string_input();
                db.removeRow(connection,table_name,delete_key);
                break;
            default:break;
        }
    }

}
