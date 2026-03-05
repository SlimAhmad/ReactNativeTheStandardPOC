import { MovieViewService } from '@/Services/views/movies/MovieViewService';
import { MovieResponseView } from '@/models/views/movies/movieResponseView';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const movieViewService = new MovieViewService();

export default function MoviesScreen() {
  const [movies, setMovies] = useState<MovieResponseView | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleLoadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      setMovies(null);

      const response = await movieViewService.retrieveAllMovieViewsAsync();
      setMovies(response);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    } catch (err: any) {
      setError('Failed to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderMovie = ({ item, index }: { item: any; index: number }) => {
    const inputRange = [0, 1];
    const translateY = fadeAnim.interpolate({
      inputRange,
      outputRange: [40 + index * 10, 0],
    });

    return (
      <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY }] }]}>
        {item.posterPath ? (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w200${item.posterPath}` }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.posterPlaceholder}>
            <Text style={styles.posterPlaceholderText}>🎬</Text>
          </View>
        )}
        <View style={styles.cardContent}>
          <Text style={styles.movieTitle} numberOfLines={2}>
            {item.name || item.title || 'Untitled'}
          </Text>
          <Text style={styles.movieDescription} numberOfLines={3}>
            {item.description || 'No description available.'}
          </Text>
          <View style={styles.cardMeta}>
            {item.favoriteCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>♥ {item.favoriteCount}</Text>
              </View>
            )}
            {item.itemCount > 0 && (
              <View style={[styles.badge, styles.badgeSecondary]}>
                <Text style={styles.badgeText}>{item.itemCount} items</Text>
              </View>
            )}
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEyebrow}>DISCOVER</Text>
        <Text style={styles.headerTitle}>Movies</Text>
        <View style={styles.headerAccent} />
      </View>

      {/* Load Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.loadButton, loading && styles.loadButtonDisabled]}
          onPress={handleLoadMovies}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#0a0a0f" size="small" />
          ) : (
            <>
              <Text style={styles.loadButtonIcon}>▶</Text>
              <Text style={styles.loadButtonText}>Load Movies</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!movies && !loading && !error && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>🎞</Text>
          <Text style={styles.emptyStateTitle}>No movies loaded</Text>
          <Text style={styles.emptyStateSubtitle}>
            Tap the button above to fetch your movie list
          </Text>
        </View>
      )}

      {movies && (
        <FlatList
          data={movies.results}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderMovie}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.resultsCount}>
              {movies.results?.length ?? 0} movies found
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },

  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 4,
    color: '#e8c547',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#f0ece4',
    letterSpacing: -1,
  },
  headerAccent: {
    marginTop: 10,
    width: 40,
    height: 3,
    backgroundColor: '#e8c547',
    borderRadius: 2,
  },

  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  loadButton: {
    backgroundColor: '#e8c547',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#e8c547',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  loadButtonDisabled: {
    opacity: 0.6,
  },
  loadButtonIcon: {
    fontSize: 12,
    color: '#0a0a0f',
  },
  loadButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0a0a0f',
    letterSpacing: 1,
  },

  // Error
  errorContainer: {
    margin: 24,
    padding: 16,
    backgroundColor: '#1e0a0a',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#e85447',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  errorIcon: {
    fontSize: 18,
    color: '#e85447',
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: '#e85447',
    fontWeight: '500',
  },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyStateIcon: {
    fontSize: 56,
    marginBottom: 8,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f0ece4',
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#5a5a6e',
    textAlign: 'center',
    lineHeight: 20,
  },

  // List
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5a5a6e',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 16,
    marginTop: 4,
  },

  // Card
  card: {
    backgroundColor: '#13131a',
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1e1e2e',
  },
  poster: {
    width: 90,
    height: 130,
  },
  posterPlaceholder: {
    width: 90,
    height: 130,
    backgroundColor: '#1e1e2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterPlaceholderText: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#f0ece4',
    lineHeight: 20,
    marginBottom: 6,
  },
  movieDescription: {
    fontSize: 12,
    color: '#5a5a6e',
    lineHeight: 17,
    flex: 1,
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#1e1e2e',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeSecondary: {
    backgroundColor: '#0e1e1a',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#e8c547',
  },
});
