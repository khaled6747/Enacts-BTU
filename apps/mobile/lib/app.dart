import 'package:flutter/material.dart';
import 'core/config/router.dart';
import 'core/theme/app_theme.dart';

class EnactusHubApp extends StatelessWidget {
  const EnactusHubApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Enactus Hub',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      routerConfig: appRouter,
    );
  }
}
