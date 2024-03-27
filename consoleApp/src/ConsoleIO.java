import java.io.Console;
import java.sql.*;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Scanner;

public class ConsoleIO {
    public void tablePrint(ResultSet resultSet){
        try {
            ResultSetMetaData data = resultSet.getMetaData();
            int column_count = data.getColumnCount();
            String[] headers = new String[column_count];

            for (int i = 1; i <= column_count; i++) {
                System.out.print(data.getColumnName(i) + "\t");
            }
            System.out.println();
            for (int i = 1; i <= column_count; i++) {
                System.out.print("-----------\t");
            }
            System.out.println();
            while (resultSet.next()) {
                for (int i = 1; i <= column_count; i++) {
                    System.out.print("|"+resultSet.getString(i) + "|\t");
                }
                System.out.println();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    public ArrayList<String> dbTablePrint(Connection connection){
        ArrayList<String> table_name_list = new ArrayList<String>();
        try {
            DatabaseMetaData meta_data = connection.getMetaData();
            ResultSet tables = meta_data.getTables(null, null, "%", new String[]{"TABLE"});
            System.out.println("\t\tTable list:");
            Integer i = 0;
            while (tables.next()) {
                String tableName = tables.getString("TABLE_NAME");
                table_name_list.add(tableName);

                //tableName.add(tables.getString("TABLE_NAME"));
                System.out.println("["+(i+1)+"] "+table_name_list.get(i));
                i++;
            }
        } catch (Exception e) {
            System.out.println("Table names read failed");
            e.printStackTrace();
        }
        System.out.println("Press 0 to exit");
        return table_name_list;
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
    public String string_input(){
        Scanner scanner = new Scanner(System.in);
        String input=null;
        while(input==null){
          input=scanner.nextLine();
        }
        return input;
    }

    public String addRowInput(Connection connection, String tableName){
        String add_row="(";
        try {
            DatabaseMetaData meta_data = connection.getMetaData();
            String sql = "SELECT * FROM " + tableName;
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet res = statement.executeQuery();
            System.out.println("\t\tEnter information:");
            for (int i=1; i<=res.getMetaData().getColumnCount();i++){
                System.out.println("Column "+res.getMetaData().getColumnName(i)+" Type "+res.getMetaData().getColumnTypeName(i));
                if (res.getMetaData().getColumnTypeName(i)=="text"){
                    add_row+=" '"+string_input()+"'";
                }
                else{
                    add_row+=" "+string_input();
                }
                if(i==res.getMetaData().getColumnCount()){
                    add_row+=")";
                }
                else{
                    add_row+=",";
                }
            }
        } catch (Exception e) {
            System.out.println("Table names read failed");
            e.printStackTrace();
        }
        return add_row;
    }
}
