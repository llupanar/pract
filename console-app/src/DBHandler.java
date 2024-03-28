import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

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
    public void showData(Connection connection, String tableName){
        try{
            Statement statement=connection.createStatement();
            ResultSet output=null;
            output =statement.executeQuery("SELECT * FROM "+tableName);
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
    public void addRow(Connection connection, String tableName, String values){
        try{
            Statement statement=connection.createStatement();
            System.out.println("INSERT INTO "+tableName+" VALUES "+values);
            statement.executeUpdate("INSERT INTO "+tableName+" VALUES "+values);
        } catch (Exception e) {
            System.out.println("add row failed");
        }
    }
    public void removeRow(Connection connection, String tableName, String key){
        try{
            Statement statement=connection.createStatement();
            statement.executeUpdate("DELETE FROM "+tableName+" WHERE "+key);
        } catch (Exception e) {
            System.out.println("remove row failed");
        }
    }
    public void editRow(Connection connection, String table_name, List<String> requests){
        try{
            Statement statement=connection.createStatement();
            for (String request : requests) {
                statement.executeUpdate(request);
            }
        } catch (Exception e) {
            System.out.println("edit row failed");
        }
    }
}

