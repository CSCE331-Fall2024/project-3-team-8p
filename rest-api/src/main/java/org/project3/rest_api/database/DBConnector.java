package org.project3.rest_api.database;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.*;
import java.util.function.Function;

/**
 * Database interaction parent class
 *
 *  @author Soham Nagawanshi
 */

@Repository
/**
 * Default constructor for DBConnector
 */
public class DBConnector {
    /**
     * Default constructor for DBConnector
     */
    public DBConnector() {
        // Default constructor
    }

    /**
     * Calendar instance used for date and time operations
     */
    protected final Calendar calendar = Calendar.getInstance();
    /**
     * maintains single connection to database;
     * '@autowired' instantiates dataSource automatically
     **/
    @Autowired
    protected DataSource dataSource;

    /**
     * Serializes JSON
     * */
    protected final ObjectWriter objectWriter = new ObjectMapper().writer().withDefaultPrettyPrinter();

    /**
     * Executes all necessary SQL queries
     *
     * @param <T>    the type of the result
     * @param query  query string from QueryTemplate
     * @param mapper mapper from SQLToJavaMapper
     * @return list of query results
     * @throws SQLException if a database access error occurs
     */
    protected <T> List<T> executeQuery(String query, Function<ResultSet, T> mapper) throws SQLException {
        List<T> results = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {

            ResultSet rs = stmt.executeQuery(query);

            while (rs.next()) {
                T item = mapper.apply(rs);
                results.add(item);
            }

            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return results;
    }

    /**
     * Inserts or modifies database
     * @param query query used to modify database
     * */
    protected void executeUpdate(String query) {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {

            stmt.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
