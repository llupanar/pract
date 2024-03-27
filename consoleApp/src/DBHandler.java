import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DBHandler {
    public Connection connectToDb(String DB_URL, String USER, String PASS) {
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("JDBC Driver is not found.");
            e.printStackTrace();
        }

        System.out.println("PostgreSQL JDBC Driver successfully connected");
        Connection connection = null;

        try {
            connection = DriverManager
                    .getConnection(DB_URL, USER, PASS);

        } catch (Exception e) {
            System.out.println("Connection failed");
            e.printStackTrace();
        }

        if (connection != null) {
            System.out.println("Сonnected to " + DB_URL);
        } else {
            System.out.println("Connection failed");
        }
        return connection;
    }
    public void showData(Connection connection, String table_name){
        try{
            Statement statement=connection.createStatement();
            ResultSet output=null;
            output =statement.executeQuery("SELECT * FROM "+table_name);
            ConsoleIO temp=new ConsoleIO();
            if (output==null){
                System.out.println("Empty");
            }else {
                temp.tablePrint(output);
            }
        } catch (Exception e) {
        System.out.println("Connection failed");
        }
    }
    public void addRow(Connection connection, String table_name, String values){
        try{
            Statement statement=connection.createStatement();
            ResultSet output=null;
            System.out.println("INSERT INTO "+table_name+" VALUES "+values);
            statement.executeUpdate("INSERT INTO "+table_name+" VALUES "+values);
        } catch (Exception e) {
            System.out.println("add row failed");
        }
    }
    public void removeRow(Connection connection, String table_name, String key){
        try{
            Statement statement=connection.createStatement();
            ResultSet output=null;
            statement.executeUpdate("DELETE FROM "+table_name+" WHERE "+key);
        } catch (Exception e) {
            System.out.println("remove row failed");
        }
    }
    public void editRow(Connection connection, String table_name, String edit_rq){
        try{
            Statement statement=connection.createStatement();
            ResultSet output=null;
            statement.executeUpdate(edit_rq);
        } catch (Exception e) {
            System.out.println("edit row failed");
        }
    }
}

