# Shared Models

This package is intended to hold shared data models, DTOs, and interfaces used by both the Flutter client and the NestJS backend.

## Purpose

- Define a single source of truth for data contracts between client and server
- Share validation rules, enum definitions, and type-safe DTO structures
- Enable compile-time type safety across the full stack

## Current Status

This package is **not yet implemented**. It will be populated when:

- Authentication DTOs are defined (login, register, token refresh)
- Task, announcement, and meeting models are created
- WebSocket event payloads are formalized

## Future Usage

The shared models will be consumed as:

- **Flutter**: A Dart package included via `path:` dependency in `pubspec.yaml`
- **NestJS**: A TypeScript package included via `path:` dependency in `package.json`
