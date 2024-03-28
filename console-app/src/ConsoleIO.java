import java.io.Console;
import java.sql.*;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ConsoleIO {
    public void tablePrint(ResultSet resultSet){
        try {
            ResultSetMetaData data = resultSet.getMetaData();
            int columnCount = data.getColumnCount();
            String[] headers = new String[columnCount];

            for (int i = 1; i <= columnCount; i++) {
                System.out.print(data.getColumnName(i) + "\t");
            }
            System.out.println();
            for (int i = 1; i <= columnCount; i++) {
                System.out.print("-----------\t");
            }
            System.out.println();
            while (resultSet.next()) {
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print("|"+resultSet.getString(i) + "|\t");
                }
                System.out.println();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    public ArrayList<String> dbTablePrint(Connection connection){
        ArrayList<String> tableNameList = new ArrayList<String>();
        try {
            DatabaseMetaData metaData = connection.getMetaData();
            ResultSet tables = metaData.getTables(null, null, "%", new String[]{"TABLE"});
            System.out.println("\t\tTable list:");
            Integer i = 0;
            while (tables.next()) {
                String tableName = tables.getString("TABLE_NAME");
                tableNameList.add(tableName);

                //tableName.add(tables.getString("TABLE_NAME"));
                System.out.println("["+(i+1)+"] "+tableNameList.get(i));
                i++;
            }
        } catch (Exception e) {
            System.out.println("Table names read failed");
            e.printStackTrace();
        }
        System.out.println("Press 0 to exit");
        return tableNameList;
    }
    public void printMenu(String table_name){
        System.out.println("\t\t"+table_name);
        System.out.println("1. Show rows");
        System.out.println("2. Add row");
        System.out.println("3. Edit");
        System.out.println("4. Delete row");
        System.out.println("Press 0 to exit");
    }

    public int numberInput(Integer left, Integer right){
        Console console = System.console();
        if (console == null) {
            System.err.println("console error");
            System.exit(1);
        }
        char input;
        boolean isValidInput = false;
        do {
            input = console.readPassword("> ")[0];
            if (Character.isDigit(input)) {
                int number = Character.getNumericValue(input);
                if (number >= left&& number <= right) {
                    isValidInput = true;
                } else {
                    console.writer().print("\b \b"); // Стирание символа
                }
            } else {
                console.writer().print("\b \b"); // Стирание символа
            }
        } while (!isValidInput);

        int number = Character.getNumericValue(input);

        return number;
    }
    public String stringInput(){
        Scanner scanner = new Scanner(System.in);
        String input=null;
        while(input==null){
          input=scanner.nextLine();
        }
        return input;
    }

    public List<String> stringsInput(){
        Console console = System.console();
        if (console == null) {
            System.err.println("console error");
            System.exit(1);
        }
        List<String> sentences = new ArrayList<>();
        String input;
        do {
            input = console.readLine("Enter request: ");
            if (!input.isEmpty()) {
                sentences.add(input);
            }
        } while (!input.isEmpty());
        System.out.println("Введенные предложения:");
        for (String sentence : sentences) {
            System.out.println(sentence);
        }
        return sentences;
    }
    public String addRowInput(Connection connection, String tableName){
        String addRow="(";
        try {
            String sql = "SELECT * FROM " + tableName;
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet res = statement.executeQuery();
            System.out.println("\t\tEnter information:");
            for (int i=1; i<=res.getMetaData().getColumnCount();i++){
                System.out.println("Column "+res.getMetaData().getColumnName(i)+" Type "+res.getMetaData().getColumnTypeName(i));
                if (res.getMetaData().getColumnTypeName(i)=="text"){
                    addRow+=" '"+ stringInput()+"'";
                }
                else{
                    addRow+=" "+ stringInput();
                }
                if(i==res.getMetaData().getColumnCount()){
                    addRow+=")";
                }
                else{
                    addRow+=",";
                }
            }
        } catch (Exception e) {
            System.out.println("Table names read failed");
            e.printStackTrace();
        }
        return addRow;
    }
}
