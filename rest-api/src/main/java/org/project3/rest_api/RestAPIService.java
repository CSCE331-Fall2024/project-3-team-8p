package org.project3.rest_api;

import org.project3.rest_api.models.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

/**
 * This class is used to directly interact with the database
 *
 *  @author Soham Nagawanshi
 */

@Repository
public class RestAPIService {

    /**
     * This is used to maintain a single connection to the database;
     * Autowired instantiates dataSource automatically
     **/
    @Autowired
    private DataSource dataSource;

    /**
     * This generic function is used to execute all necessary queries
     * @param query query string from QueryTemplate
     * @param mapper mapper from SQLToJavaMapper
     * @return list of query results
     * */
    public <T> List<T> executeQuery(String query, Function<ResultSet, T> mapper) throws SQLException {
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
            // TODO (maybe): display stack trace graphically somewhere
            e.printStackTrace();
        }

        return results;
    }

    /**
     * Selects all menu items
     *
     * @return a list of all menu items
     */
    public List<MenuItem> selectMenuItems() {
        List<MenuItem> items = null;
        try {
            items = executeQuery(
                    String.format(QueryTemplate.selectAllMenuItems),
                    SQLToJavaMapper::menuItemMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return items;
    }

}
