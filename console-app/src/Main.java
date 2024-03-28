
import java.sql.DriverManager;
import java.sql.Connection;
//import java.sql.SQLException;
public class Main {
    static final String DB_URL = "jdbc:postgresql://127.0.0.1:5432/swimming-pool";
    static final String USER = "veranda";
    static final String PASS = "qwaszx";

    public static void main(String[] argv) {
        Menu menu = new Menu();
        menu.menu(DB_URL, USER, PASS);;
    }
}
