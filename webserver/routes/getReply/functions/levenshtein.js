module.exports = function(userQuery, title) {
                        let matrix = [];

                        // increment along the first column of each row
                        let i;
                        for (i = 0; i <= title.length; i = i + 1) {
                            matrix[i] = [i];
                        }

                        // increment each column in the first row
                        let j;
                        for (j = 0; j <= userQuery.length; j = j + 1) {
                            matrix[0][j] = j;
                        }

                        // Fill in the rest of the matrix
                        for (i = 1; i <= title.length; i = i + 1) {
                            for (j = 1; j <= userQuery.length; j = j + 1) {
                                if (title.charAt(i - 1) === userQuery.charAt(j - 1)) {
                                    matrix[i][j] = matrix[i - 1][j - 1];
                                } else {
                                    matrix[i][j] =
                                     // substitution
                                     Math.min(matrix[i - 1][j - 1] + 1,
                                     // insertion
                                    Math.min(matrix[i][j - 1] + 1,
                                    // deletion
                                    matrix[i - 1][j] + 1));
                                }
                            }
                        }
                        return matrix[title.length][userQuery.length];
};
