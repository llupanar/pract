import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
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

    public void removeRow(Connection connection, String tableName, String deleteCondition){
        Statement statement = null;
        ResultSet resultSet = null;
        try {
            statement = connection.createStatement();
            resultSet = statement.executeQuery("SELECT * FROM " + tableName + " WHERE " + deleteCondition);
            List<String> keysToDelete = new ArrayList<>();
            while (resultSet.next()) {
                String key = resultSet.getString(1);
                keysToDelete.add(key);
            }
            statement.executeUpdate("DELETE FROM "+tableName+" WHERE "+deleteCondition);
            String employeeKeys = formatKeys(keysToDelete, tableName);
            try {
                switch (tableName) {
                    case "employee":
                        statement.executeUpdate("DELETE FROM client WHERE employee_passport_number IN (" + employeeKeys + ")");
                        break;
                    case "client":
                        statement.executeUpdate("DELETE FROM visit WHERE client_passport_number IN (" + employeeKeys + ")");
                        break;
                    case "swgroup":
                        statement.executeUpdate("DELETE FROM pool_subscription WHERE swgroup_id IN (" + employeeKeys + ")");
                        statement.executeUpdate("DELETE FROM schedule WHERE swgroup_id IN (" + employeeKeys + ")");
                        break;
                    case "lesson":
                        statement.executeUpdate("DELETE FROM visit WHERE lesson_id IN (" + employeeKeys + ")");
                        statement.executeUpdate("DELETE FROM schedule WHERE lesson_id IN (" + employeeKeys + ")");
                        break;
                    case "job_title":
                        statement.executeUpdate("DELETE FROM employee WHERE position IN (" + employeeKeys + ")");
                        break;
                }
            }catch (Exception e){
                System.out.println("No tables");
            }
        } catch (Exception e) {
            System.out.println("remove row failed");
        }
    }
    public void editRow(Connection connection, String table_name, List<String> requests){
        try{
            connection.setAutoCommit(false);
            Statement statement=connection.createStatement();
            for (String request : requests) {
                statement.executeUpdate(request);
            }
            connection.commit();
            connection.setAutoCommit(true);
        } catch (Exception e) {
            System.out.println("edit row failed");
        }
    }
    private String formatKeys(List<String> keys, String tableName) {
        StringBuilder keysBuilder = new StringBuilder();
        for (String key : keys) {
            if (tableName.equals("employee") || tableName.equals("client")||tableName.equals("job_title")) {
                keysBuilder.append("'");
                keysBuilder.append(key);
                keysBuilder.append("', ");
            } else {
                keysBuilder.append(key);
                keysBuilder.append(", ");
            }
        }
        keysBuilder.delete(keysBuilder.length() - 2, keysBuilder.length());
        return keysBuilder.toString();
        }
}


